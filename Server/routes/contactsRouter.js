const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contacts.controller');
const auth = require('../middlewares/auth');

router.get('/getAll/:userId', auth, ContactController.GetContactsbyUserId)

router.post('/create', auth, ContactController.CreateContactbyUserId)

router.put('/update/:contactId', auth, ContactController.UpdateContactbyId)

router.delete('/delete/:contactId', auth, ContactController.DeleteContactbyId)

router.get('/getSingle/:contactId', auth, ContactController.GetSingleContactbyId)

module.exports = router;