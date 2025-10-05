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
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    //ensure all fields are provided
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({message: 'All fields are required'});
    }
    const newContact = new Contact({firstName, lastName, email, favoriteColor, birthday});
    const savedContact = await newContact.save();
    //return new contact ID
    res.status(201).json({ 
      id: savedContact._id,
      firstName: savedContact.firstName,
      lastName: savedContact.lastName,
      email: savedContact.email,
      favoriteColor: savedContact.favoriteColor,
      birthday: savedContact.birthday
    });
  } catch (err) {
    res.status(500).json({message: err.message });
  }
  console.log(req.body)
});

// PUT - update a contact
router.put('/:id', async (req, res) => {
  try {
    // Update only the fields provided in req.body
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

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
    res.status(200).json({ message: 'Contact successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router;
