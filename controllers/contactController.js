const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactmodel");
//@desc Get all contacts
// @access Private
//@route GET /api/contacts

const getContacts = asyncHandler(async(req, res) =>{
  const contacts = await Contact.find( {user_id: req.user.id});
  res.status(200).json(contacts);
});
//@desc Create contact
// @access Private
//@route GET /api/contacts

const createContact = asyncHandler(async(req, res) =>{
  console.log("The request body is: ", req.body)
  const {name, email, phone} = req.body;
  if(!name || !email || !phone){
    res.status(400);
    throw new Error('Please add all fields');
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json(contact);
});

//@desc Get contact
// @access Private
//@route GET /api/contacts/

const getContact = asyncHandler(async(req, res) =>{
  const contact = await Contact.findById(req.params.id);
  if(!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact)
});

//@desc Update contact
// @access Private
//@route PUT /api/contacts

const updateContact = asyncHandler(async(req, res) =>{
  const contact = await Contact.findById(req.params.id);
  if(!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new : true}
  )
  res.status(200).json(updatedContact);
});

//@desc Delete contact
// @access Private
//@route DELETE /api/contacts

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact}