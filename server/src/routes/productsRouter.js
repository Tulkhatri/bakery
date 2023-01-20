const express = require('express')
const router = express.Router()
const Products = require('../models/products')
router.post('/products', async (req, res) => {
  try {
    const products = await Products.create(req.body);
    
    if (products) {
      res.json({ msg: 'Product is added' });
    } else {
      res.json({ msg: 'something went worng' });
    }
  } catch (err) {
   
  }
});

router.put('/products', async (req, res) => {
  try {
    const data=await Products.findByIdAndUpdate(req.body._id,req.body)
    if(data){
      res.status(200).json({msg:"Product is updated"})
    }else{res.json({msg:"Something is worong"})}
  } catch (err) {
   
  }
});

router.delete('/products', async (req, res) => {
  try {
    const data=await Products.findByIdAndDelete(req.body._id)
    if(data){
      res.status(200).json({msg:"Product is deleted"})
    }else{res.json({msg:"Something is worong"})}
  } catch (err) {
   
  }
});


router.get("/products", async (req, res) => {
  try {
    const data = await Products.find()
    if (data) {
      res.status(200).json({
        products: data
      })
    }
  } catch (err) {
  
  }
});
module.exports = router;
