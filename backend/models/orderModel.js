const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    cartItems: Array,
    amount: String,
    status: String,
    createdAt : Date
})

const orderModel=mongoose.model('orders',orderSchema)

module.exports=orderModel;