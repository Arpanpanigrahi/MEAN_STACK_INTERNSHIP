const Contact = require('../models/Contact');
const joi = require('joi');
exports.contactList = async(req,res)=>{
    try {
        let contacts= await Contact.find().populate('customerId');
        if(!contacts){
            contacts=[]
        }
        res.status(200).json({
            message:"Contacts Fetched Successfully",
            contactData:contacts
        })
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err
        }) 
    }
    
} 

exports.createContact = async(req,res)=>{
    const contactSchema = joi.object({
        customerId:joi.string().required(),
        contactName:joi.string().required(),
        contactNumber:joi.string().required().length(10)
    })
    try {
        let contactFields = await  contactSchema.validateAsync(req.body);
        let contact = Contact.findOne({contactName:Contact.contactName})
        if(contact!=contactFields.contactName){
            contact = new Contact(contactFields); 
            await contact.save();                
            res.status(200).json({
                message:"Contact saved Successfully",
                contactData:contact
            })
        }else{
            res.status(200).json({
                message:"Contact already exist"
            })
        }
       
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
}

exports.updateContact = async(req,res)=>{
    const id = req.params.id;                   
    const updateSchema = joi.object({
        customerId:joi.string().required(),
        contactName:joi.string().required(),
        contactNumber:joi.string().required().length(10)
    })
    try {
            let updateFields = await updateSchema.validateAsync(req.body);
            const updatedContact = await Contact.findByIdAndUpdate(id,{$set:updateFields});
            if(updatedContact==null){
                res.status(400).json({
                message:"Contact didn't update/ID not found"
            })
    }
    else{
        res.status(200).json({
            message:"Contact updated successfully",
            updatedContact:updatedContact
        })
    }
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
}

exports.deleteContact = async(req,res)=>{
    const id = req.params.id

    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if(deletedContact==null){
            res.status(400).json({
                message:"Contact didn't delete/ID not found"
            })
        }
        else{
            res.status(200).json({
                message:"Contact deleted successfully"
            })
        }
        
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
    

}

