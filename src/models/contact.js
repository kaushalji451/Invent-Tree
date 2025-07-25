import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    language: {
        type: String,
    },
    inquiryType:{
        type: String,
        required: true,
    }
},
    { timestamps: true }
);


const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
