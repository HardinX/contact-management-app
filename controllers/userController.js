const asyncHandler =require("express-async-handler");
const bcrypt = require("bcrypt")
const User = require("../models/usermodel")
//@desc Register a user
// @access Public
//@route POST / api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  //Check for existing user in the database
  const userAvailable = await User.findone({email});
  if(userAvailable){
    res.status(400);
    throw new Error ("Email already exists")
  }
  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});
//@desc login user
// @access Public
//@route POST / api/users/login
const loginUser = asyncHandler(async(req, res) =>{
  res.json({message: "login user"})
})

//@desc current  user
// @access Public
//@route POST / api/users/current
const currentUser = asyncHandler(async(req, res) =>{
  res.json({message: "current user info"})
})

module.exports ={registerUser, loginUser, currentUser}