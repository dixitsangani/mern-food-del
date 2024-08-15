const Food_Listdata = require("../../../Models/Food_List/Food_List_Model");
const path = require('path');

const fs = require('fs').promises;

module.exports.Add_Food_List = async (req, res) => {
    try {
        let img = '';
        if (req.file) {
            // Store relative path
            img = path.join('/Uploads/Food_List', req.file.filename).replace(/\\/g, "/");
        }

        req.body.image = img;
        let ReData = await Food_Listdata.create(req.body);
        if (ReData) {
            return res.status(200).json({ mes: 'Food list added', status: 1 });
        } else {
            return res.status(400).json({ mes: 'Food list not added', status: 0 });
        }
    } catch (error) {
        console.error('Error adding food list:', error);
        return res.status(500).json({ mes: 'Server error', status: 0, error: error.message });
    }
};

module.exports.View_Food_List = async (req, res) => {
    try {
        let FoodData = await Food_Listdata.find({});
        if (FoodData.length > 0) {
            return res.status(200).json({ mes: 'Food records found', status: 1, record: FoodData });
        } else {
            return res.status(404).json({ mes: 'No food records found', status: 0 });
        }
    } catch (err) {
        return res.status(500).json({ mes: 'Server error', status: 0, error: err.message });
    }
};
// Delete Food List endpoint
module.exports.Delete_Food_List = async (req, res) => {
    try {
        const food_list_Id = req.params.id;
        const food_list = await Food_Listdata.findById(food_list_Id);

        if (food_list) {
            // Construct the correct path to the image file
            const ipath = path.join(__dirname, '../../Uploads/Food_List', food_list.image);

            try {
                await fs.access(ipath);
                await fs.unlink(ipath);
                console.log('File deleted successfully:', ipath);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    console.log('File not found, skipping deletion:', ipath);
                } else {
                    throw err; // Rethrow if it's another error
                }
            }
        }

        const foodDelete = await Food_Listdata.findByIdAndDelete(food_list_Id);

        if (!foodDelete) {
            return res.status(404).json({ mes: 'Food list not found' });
        }

        res.status(200).json({ mes: 'delete' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ mes: 'Internal Server Error' });
    }
};