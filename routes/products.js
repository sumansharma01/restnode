const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//for database model
const Product = require("../models/ProductsModel");


const serverUrl="http://localhost:3000/products/";

router.get("/", (req, res, next) => {
  Product.find()
  .select('-__v')
  .then((result)=>{
        const response={
            count:result.length,
            products:result.map((singleResult)=>
                {
                    return{
                        id:singleResult._id,
                        name:singleResult.name,
                        price:singleResult.price,
                        request:{
                            id:singleResult._id,
                            type:'GET this product',
                            url:serverUrl+singleResult._id
                        }
                    }
                }
            )
            
        }

      res.status(200).json(response);
  })
  .catch((err)=>{
      res.status(500).json({error:err});
  })
});



router.post("/", (req, res, next) => {
  const product = new Product({
      _id:new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) =>{
    const response={
        message:"New product saved successfully",
        id:result._id,
        name:result.name,
        price:result.price,
        request:{
            type:"GET this product",
            url:serverUrl+result._id
        }
    }

      res.status(200).json(
        response
      )}
    )
    .catch((err) => {
      error = err;
    });
});



router.get("/:id", (req, res, next) => {
  id = req.params.id;
  Product.findById(id)
  .then((result)=>{
  const response={
      message:"product fetched with id "+id,
      request:{
          type:"GET all products",
          url:serverUrl
      }
  }
    res.status(200).json(
        response
    )}
  )
  .catch((err)=>{
      res.status(500).json({error:err});
  })
});

router.patch("/:id", (req, res, next) => {
  id = req.params.id;
  const updateData={};
  for(const data of req.body){
      updateData[data.key]=data.value;
  }
  Product.updateOne({_id:id},{$set:updateData})
  .then((result)=>{
  const response={
    message:id+" updated with values",
    id:result._id,
    name:result.name,
    price:result.price,
    request:{
        type:"GET all products",
        url:serverUrl
    }
  }
    res.status(200).json(
        
        response
    )}
  )
  .catch((err)=>{
      res.status(500).json({
          error:err
      });
  });

});

router.delete("/:id", (req, res, next) => {
  id = req.params.id;
  
  Product.deleteOne({_id:id}).then(()=>{
      const response={
        message:id+" deleted",
        request:{
            type:"Post a new product",
            url:serverUrl,
            body:{
                name:"String",
                price:"Number"
            }
        }
      }
    res.status(200).json(response)
  })
  .catch((err)=>{
      res.status(500).json({error:err});
  })
});

module.exports = router;
