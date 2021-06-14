const express = require('express');

const router = express.Router();

const customerController = require('../controllers/contact.controller');

const auth = require('../middleware/auth');

router.post('/addcontact',auth,customerController.createContact);
router.get('/contactlist',auth,customerController.contactList);
router.put('/updatecontact/:id',auth,customerController.updateContact);
router.delete('/deletecontact/:id',auth,customerController.deleteContact);

module.exports = router;