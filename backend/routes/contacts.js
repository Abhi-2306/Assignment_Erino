const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, company, jobTitle } = req.body;
        if(!firstName || !lastName || !email || !phone || !company || !jobTitle) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existing = await Contact.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Contact already exists with the same email' });
        }
        const contact = await Contact.create({ firstName, lastName, email, phone, company, jobTitle });
        res.status(201).json(contact);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedContact);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        await Contact.findByIdAndDelete(id);
        res.json({ message: 'Contact deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});



module.exports = router;