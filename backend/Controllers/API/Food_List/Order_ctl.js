const orderModel = require("../../../Models/Food_List/Order_Model");
const userModel = require("../../../Models/Food_List/User_Model");
// module.exports.placeOrder = async (req, res) => {
    

    
// }
module.exports.placeOrder = async (req, res) => {
   

    try {
        // Validate request body
        if (!req.body.userId || !req.body.items || !req.body.amount || !req.body.address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();

        // Update user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });


    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "An error occurred while processing your order" });
    }
};


module.exports.userOrder = async (req, res) => {

    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })

    }

}

module.exports.listOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, data: orders })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}
module.exports.UpdateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating status" });
    }
};



