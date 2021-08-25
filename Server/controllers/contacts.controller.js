const Contact = require("../models/contactsModel");
const joi = require('joi');
const jwt = require('jsonwebtoken');
const secretKey = "ThisIsAVeryLongSecretWhichCannotBeCracked12345789";
const multer = require('multer');
const upload = multer({dest: "uploads/"}).single('image');
const fs = require('fs');

const GetContactsbyUserId = async(req, res)=>{
    let uId = req.params.userId;
    try{
        let contactData = await Contact.find({userId: uId});
        console.log(contactData);
        if(!contactData){
            contactData = [];
        }
        res.status(200).json({
            message:`Contacts List for ${uId}`,
            contacts: contactData
        })
    } catch (err) {
        res.status(400).json({
            message:"Something went wrong",
            check:true
        })
    }
}

const CreateContactbyUserId = async(req, res)=>{

    try{
        await upload(req, res, async(err)=>{
            let token = await jwt.verify(req.header("x-auth-token"), secretKey);
            let imagefilename = req.file === undefined ? 'default.jpg' : req.file.filename;
            console.log(req.body);
            const contactSchema = joi.object({
                name : joi.string().min(1).required(),
                email : joi.string().email().required(),
                phone : joi.string().length(10).required(),
                type : joi.string(),
                image : joi.string(),
                userId: joi.string()
            });

            let contactObj = {
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                type : req.body.type,
                image : imagefilename,
                userId : token.user.id
            };

            try{
                let contactFields = await contactSchema.validateAsync(contactObj); 
                let findData = await Contact.findOne(
                    {
                        $or:[
                            {phone: contactFields.phone},
                            {email: contactFields.email}
                        ]
                    }
                );
        
                if(!findData){
                    let newContact = new Contact(contactFields);
                    await newContact.save();
                    res.status(201).json({
                        message:"New Contact Saved",
                        contact: newContact,
                        duplicate:false
                    })
                } else {
                    if(! (req.file === undefined) )
                        await fs.unlinkSync('./uploads/'+imagefilename);

                    res.status(200).json({
                        message:"Duplicate Contact",
                        contact: findData,
                        duplicate:true
                    })
                }
            } catch(err) {
                console.log(err);
                res.status(500).json({
                    message:"Something went wrong :(",
                    check:true
                })
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Something went wrong",
            check:true
        })
    }
}

const UpdateContactbyId = async(req, res)=>{
    let contactId = req.params.contactId;
    let contactObj = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        type : req.body.type
    };

    let contactSchema = joi.object({
        name : joi.string().min(1).required(),
        email : joi.string().email().required(),
        phone : joi.string().length(10).required(),
        type : joi.string()       
    });

    try{
        let contactFields = await contactSchema.validateAsync(contactObj);
        let updateContact = await Contact.findByIdAndUpdate(contactId,{$set:contactFields},{new:true});
        res.status(200).json({
            message : "Contact Updated Successfully",
            contact : updateContact,
            check:false
        });        
    } catch(err) {
        res.status(200).json({
            message : "Contact Not Found",
            check : true
        });
    }
}

const DeleteContactbyId = async(req, res)=>{
    let contactId = req.params.contactId;
    try {
        let deletedContact = await Contact.findByIdAndDelete(contactId);
        console.log(deletedContact);
		if(deletedContact){
		    res.status(200).json({
            message: "Contact deleted successfully",
            check:false
		  })	
		} else {
			res.status(200).json({
			message: "Contact not found",
			check:true
			})
		}
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            check: true
        })
    }
}

const GetSingleContactbyId = async(req, res)=>{
    let contactId = req.params.contactId;
    try{
        let contactData = await Contact.findById(contactId);
        if(contactData){
            res.status(200).json({
				message:"Contact fetched successfully",
				contact: contactData
			});
        } else {
            res.status(200).json({
                message:"Contact does not exist",
                check: false
            })
        }
    } catch (err) {
        res.status(400).json({
            message:"Something went wrong",
            check:true
        })
    }
}

module.exports = {
    GetContactsbyUserId,
    CreateContactbyUserId,
    UpdateContactbyId,
    DeleteContactbyId,
    GetSingleContactbyId
}