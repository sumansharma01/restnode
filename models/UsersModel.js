const mongoose=require('mongoose');

const usersSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        
    }
})

const User=mongoose.model('User',usersSchema);

module.exports=User;