const mongoose=require('mongoose');

const productsSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    price:Number
});

const product=mongoose.model('Product',productsSchema);

module.exports=product;