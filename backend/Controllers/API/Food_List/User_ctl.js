const userModel = require("../../../Models/Food_List/User_Model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Food_Listdata = require("../../../Models/Food_List/Food_List_Model");



// registerUser

module.exports.registerUser = async (req, res) => {

    const { name, password, email } = req.body;

    try {
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "user already exists" });

        }

        //validating email & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "password should be at least 8 characters" })
        }

        //hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedpassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: " error" });
    }

}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


// loginUser

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user doesn't exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "invalid password" })
        }
        const token = createToken(user._id)
        res.json({success:true,token});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})

    }
}