const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//for database model
const Product = require("../models/ProductsModel");

router.get("/", (req, res, next) => {
  Product.find()
  .then((result)=>{
      res.status(200).json({
          products:result
      })
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
    .then((result) =>
      res.status(200).json({
        message: "New product saved",
        result,
      })
    )
    .catch((err) => {
      error = err;
    });
});



router.get("/:id", (req, res, next) => {
  id = req.params.id;
  Product.findById(id)
  .then((result)=>
    res.status(200).json(
        {
            message:"product fetched with id "+id,
            result:result
        }
    )
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
  .then((result)=>
    res.status(200).json({
        message:id+" updated with values",
        updatedData:result
    })
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
    res.status(200).json({
        message:id+" deleted"
    })
  })
  .catch((err)=>{
      res.status(500).json({error:err});
  })
});

module.exports = router;
