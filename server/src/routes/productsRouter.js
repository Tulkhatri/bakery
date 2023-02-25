const { Router } = require('express');
const app = Router();
const productController = require("../controllers/productsController")
const uploadMiddleware = require("../utils/imageUpload")

const tokenValidator = (req, res, next) => {//jun jun route lai protect garna man xa tyo route ma yo function pathaidine product ma pathayeko jasari product ma chahi pathauna naparla yo just example ko lagi matra
  const token = (req.headers.authorization.split(" ")[1])
  jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
    if (err) return res.sendStatus(403)
    if (decoded) next()
  });
}
app.post('/products', uploadMiddleware.upload, productController.PostProducts)
app.put('/products', productController.PutProducts)
app.delete('/products', productController.DeleteProducts)
app.delete('/favoriteProducts', productController.DeleteFavoriteProducts)

// router.get("/products", tokenValidator, async (req, res) => {
  app.get('/products', productController.GetProducts)
  app.post('/orderProducts', productController.OrderProduct)
  app.post('/cartOrderProducts', productController.CartOrderProduct)
  app.post('/favoriteProducts', productController.PostFavoriteProducts)
  app.get('/favoriteProducts', productController.GetFavoriteProducts)
  app.patch('/orderProducts/status', productController.PatchOrderProducts)
  app.get('/orderProducts', productController.GetOrderProducts)
  app.post('/cart', productController.PostCart)
  app.get('/cart', productController.GetCart)
  app.delete('/cart', productController.DeleteCart)

module.exports = app;
