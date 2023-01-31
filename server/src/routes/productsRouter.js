const express = require('express')
const router = express.Router()
const Products = require('../models/products')
const OrderProducts = require('../models/orderProducts')
const jwt = require('jsonwebtoken');
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

const tokenValidator=(req,res,next)=>{//jun jun route lai protect garna man xa tyo route ma yo function pathaidine product ma pathayeko jasari product ma chahi pathauna naparla yo just example ko lagi matra
  const token=(req.headers.authorization.split(" ")[1])
  // console.log(req.headers.authorization.split(" ")[1]) just test
  jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
    if(err)return res.sendStatus(403)
    if(decoded) next()
  });
}

// router.get("/products", tokenValidator, async (req, res) => {
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
router.post('/orderProducts',async(req,res)=>{
  try{
const orderProducts=await OrderProducts.create(req.body)
if (orderProducts) {
  res.json({ msg: 'Order successful' });
} else {
  res.json({ msg: 'something went worng' });
}
  }catch(err){

  }
});
router.get('/orderProducts',async(req,res)=>{
  try {
    const data = await OrderProducts.find()
    if (data) {
      res.status(200).json({
        orderProducts: data
      })
    }
  } catch (err) {
  
  }
});
module.exports = router;
