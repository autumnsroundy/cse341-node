const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one contact by id
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - create a new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, } = req.body;
    //ensure all fields are provided
    if (!name || !email || !phone) {
      return res.status(400).json({message: 'All fields are required'});
    }
    const newContact = new Contact({name, email, phone});
    const savedContact = await newContact.save();
    //return new contact ID
    res.status(201).json({ 
      id: savedContact._id,
      name: savedContact.name,
      email: savedContact.email,
      phone: savedContact.phone
    });
  } catch (err) {
    res.status(500).json({essage: err.message });
  }
});

// PUT - update a contact (name, email, phone)
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Ensure all fields are provided
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields (name, email, phone) are required' });
    }

    // Update only the allowed fields
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone }, // only update these fields
      { new: true } // return the updated document
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Return the full updated contact
    res.status(200).json(updatedContact);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//DELETE a contact
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if(!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router;
