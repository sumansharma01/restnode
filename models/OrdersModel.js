const mongoose=require('mongoose');

const ordersSchema=mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId
    },
    quantity:Number

})

const order=mongoose.model(order,ordersSchema);

module.exports=order;