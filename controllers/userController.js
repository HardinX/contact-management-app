const asyncHandler =require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/usermodel")
//@desc Register a user
// @access Public
//@route POST / api/users/register
const registerUser = asyncHandler(async (req, res) =>{
  const { username, email, password } = req.body;
  if(!username || !email || !password){
    res.status(400);
    throw new Error ("All fields are required")
  }
  //Check for existing user in the database
  const userAvailable = await User.findOne({email});
  if(userAvailable){
    res.status(400);
    throw new Error ("Email already exists")
  }
  //Create and save a user to the database
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password", hashedPassword);
   const user = await User.create({
    username: username,
     email: email,
     password: hashedPassword,
  });
  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email }); 
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});
//@desc login user
// @access Public
//@route POST / api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All fields are mandatory!" });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT, 
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ error: "Email or password is not valid" });
    }
  } catch (error) {
    // Handle database or other errors
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//@desc current  user
// @access private
//@route POST / api/users/current
const currentUser = asyncHandler(async(req, res) =>{
  res.json(req.user);
})

module.exports ={registerUser, loginUser, currentUser}