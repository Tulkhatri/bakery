const express = require('express')
const router = express.Router()
const Products = require('../models/products')
router.post('/products', async (req, res) => {
  try {
        const products = await Products.create(req.body);
        console.log(products)
        if (products) {
          res.json({ msg: 'Product is added' });
        } else {
          res.json({ msg: 'something went worng' });
        }
  } catch (err) {
    console.log(err);
  }
});


router.get("/products", async (req, res) => {
  try {
      const data = await Products.find()
      if(data){
          res.status(200).json({
              products:data
          })
      }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
