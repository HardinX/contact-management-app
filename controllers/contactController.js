const asyncHandler = require("express-async-handler")
//@desc Get all contacts
// @access Public
//@route GET /api/contacts

const getContacts = asyncHandler(async(req, res) =>{
  res.status(200).json({message: "Get all contacts"});
});
//@desc Create contact
// @access Public
//@route GET /api/contacts

const createContact = asyncHandler(async(req, res) =>{
  console.log("The request body is: ", req.body)
  const {name, email, phone} = req.body;
  if(!name || !email || !phone){
    res.status(400);
    throw new Error('Please add all fields');
  }
  res.status(200).json({message: "Create contact"});
});

//@desc Get contact
// @access Public
//@route GET /api/contacts/

const getContact = asyncHandler(async(req, res) =>{
  res.status(200).json({message: `Get contact for ${req.params.id}`});
});

//@desc Update contact
// @access Public
//@route PUT /api/contacts

const updateContact = asyncHandler(async(req, res) =>{
  res.status(200).json({message: `Update contact for ${req.params.id}`});
});

//@desc Delete contact
// @access Public
//@route DELETE /api/contacts

const deleteContact = asyncHandler(async(req, res) =>{
  res.status(200).json({message: `Delete contact for ${req.params.id}`});
});

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact}