const orderModel = require("../../../Models/Food_List/Order_Model");
const userModel = require("../../../Models/Food_List/User_Model");
const stripe = require('stripe')('sk_test_51PnC66IDr67GOUJQiQhv7bZ9SlgjYjgGUsh1PAzAfWLMw7kQVWhtaY8HORMeYpBnzpUzxIxRnzL1LxlZYqCFeHvG00rcGBwf5A'); // Replace with your secret key

// module.exports.placeOrder = async (req, res) => {
//     const frontend_url = "http://localhost:5173/";

//     try {
//         // Validate request body
//         if (!req.body.userId || !req.body.items || !req.body.amount || !req.body.address) {
//             return res.status(400).json({ success: false, message: "Missing required fields" });
//         }

//         // Create a new order
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//         });

//         await newOrder.save();

//         // Update user's cart data
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//         // Prepare line items for Stripe
//         const line_items = req.body.items.map(item => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: item.name,
//                 },
//                 unit_amount: item.price * 100 // Assuming price is in INR
//             },
//             quantity: item.quantity,
//         }));

//         // Add delivery charges
//         line_items.push({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: "Delivery Charges",
//                 },
//                 unit_amount: 2 * 100 // Delivery fee in INR
//             },
//             quantity: 1,
//         });

//         // Create a Stripe Checkout session
//         const session = await stripe.checkout.sessions.create({
//             line_items: line_items,
//             mode: 'payment',
//             success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//         });

//         res.json({ success: true, session_url: session.url });

//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ success: false, message: "An error occurred while processing your order" });
//     }
// };


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



