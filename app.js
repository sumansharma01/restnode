const express=require('express');
const app=express();


//acquiring routes
const productsRoute=require('./routes/products');
const ordersRoute=require('./routes/orders');

app.use('/products',productsRoute);
app.use('/orders',ordersRoute);

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