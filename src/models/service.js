const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        en: { type: String, required: true },
        hi: { type: String },
    },
    description: {
        en: { type: String, required: true },
        hi: { type: String },
    },
    category: { type: String }, // optional, e.g., 'Survey', 'Political', 'GIS'
    image: { type: String }, // stored via Cloudinary/Firebase
    isActive: { type: Boolean, default: true }, // for admin to toggle visibility
},
    { timestamps: true }

);

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);
export default Service;