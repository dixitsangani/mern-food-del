const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const imagePath = path.join(__dirname, '../../Uploads/Food_List'); 

const Food_ListSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const ImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure the directory exists
        if (!fs.existsSync(imagePath)) {
            fs.mkdirSync(imagePath, { recursive: true });
        }
        cb(null, imagePath);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + ext);
    }
});

Food_ListSchema.statics.uploadImage = multer({ storage: ImageStorage }).single("image");
Food_ListSchema.statics.iPath = imagePath;

const Food_Listdata = mongoose.model("Food_List", Food_ListSchema);

module.exports = Food_Listdata;
