const express =require("express");
const { RegisterUser, loginUser, currentUser } = require("../controllers/userController");

const router =express.Router();

router.post("/register", RegisterUser);

router.post("/login", loginUser);

router.get("/current", currentUser);

module.exports= router;