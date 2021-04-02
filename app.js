const express=require('express');
const app=express();


//acquiring routes
const productsRoute=require('./routes/products');
const ordersRoute=require('./routes/orders');


//bodyparser for post requests
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//using cors
const cors=require('cors');
app.use(cors());


app.use('/products',productsRoute);
app.use('/orders',ordersRoute);


//database connection
require('dotenv').config();
const mongoose=require('mongoose');
const uri=`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.6ijog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>console.log("database connected!"))
    .catch((err)=>"database connection error!");
    



//error handling
app.use((req,res,next)=>{
    const error=new Error("404 resource not found");
    error.status=404;
    next(error);

})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json(
        {
            error:{
                message:error.message
            }
        }
    )
})

module.exports=app;