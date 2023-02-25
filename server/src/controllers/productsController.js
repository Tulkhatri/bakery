const Products = require('../models/products')
const OrderProducts = require('../models/orderProducts')
const FavoriteProducts = require('../models/favoriteProducts')
const CartOrderProducts = require('../models/cartOrder')
const Cart = require('../models/cart')

const PostProducts= async (req, res, next) => {

  const body = req.body;

  const products = new Products({
    name: body.name,
    price: body.price,
    image: body.image,
    photo: req.file.filename,
  });
  products
    .save()
  if (products) {
    res.json({ msg: 'Product is added' });
  } else {
    res.json({ msg: 'something went worng' });
  }
}

const PutProducts=(async (req, res) => {
  try {
    const data = await Products.findByIdAndUpdate(req.body._id, req.body)
    if (data) {
      res.status(200).json({ msg: "Product is updated" })
    } else { res.json({ msg: "Something is worong" }) }
  } catch (err) {

  }
});

const DeleteProducts=('/products', async (req, res) => {
  try {
    const data = await Products.findByIdAndDelete(req.body._id)
    if (data) {
      res.status(200).json({ msg: "Product is deleted" })
    } else { res.json({ msg: "Something is worong" }) }
  } catch (err) {

  }
});
const DeleteFavoriteProducts=('/favoriteProducts', async (req, res) => {
  try {
    if (req.query.userId) {
      const data = await FavoriteProducts.findByIdAndDelete(req.body._id)
      if (data) {
        res.status(200).json({ msg: "Favorite is removed" })
      } else { res.json({ msg: "Something is worong" }) }
    }
  } catch (err) {


  }
});

// router.get("/products", tokenValidator, async (req, res) => {
const GetProducts=(async (req, res) => {

  const { qSearch } = req.query;
  const search = (validItems) => {
    return validItems.filter((items) =>
      items.name.toLowerCase().includes(qSearch.toLowerCase()) ||
      items.price.toLowerCase().includes(qSearch.toLowerCase())
    )
  }

  try {
    if (qSearch.length > 0) {
      const data = await Products.find()
      res.json({
        products: search(data),
      })
    } else {

      const totalProductLength = await Products.find()
      const data = await Products.find().limit(req.query.size).skip(req.query.size * req.query.page - req.query.size)
      if (data) {
        res.status(200).json({
          products: data,
          totalProudctCount: totalProductLength.length
        })
      }
    }
  } catch (err) {

  }
});

const OrderProduct=(async (req, res) => {
  try {
    const orderProducts = await OrderProducts.create(req.body)
    if (orderProducts) {
      res.json({ msg: 'Order successful' });
    } else {
      res.json({ msg: 'something went worng' });
    }
  } catch (err) {

  }
});
const CartOrderProduct=(async (req, res) => {
  try {
    const cartOrderProducts = await CartOrderProducts.create(req.body)
    if (cartOrderProducts) {
      res.json({ msg: 'Order successful' });
    } else {
      res.json({ msg: 'something went worng' });
    }
  } catch (err) {

  }
});

const PostFavoriteProducts=(async (req, res) => {
  try {
    const favoriteProducts = await FavoriteProducts.create(req.body)
    if (favoriteProducts) {
      res.json({ msg: 'favorite Items is added' });
    } else {
      res.json({ msg: 'something went worng' });
    }
  } catch (err) {

  }
});

const GetFavoriteProducts=(async (req, res) => {
  try {
    const totalFavoriteProducts = await FavoriteProducts.find({ "userId": req.query.userId })
    const data = await FavoriteProducts.find({ "userId": req.query.userId })
    if (req.query.userId) {
      res.status(200).json({
        favoriteProducts: data,
        totalFavoriteProducts: totalFavoriteProducts.length
      })
    }
  } catch (err) {

  }
});

const PatchOrderProducts=(async (req, res) => {
  try {
    const orderProducts = await OrderProducts.findByIdAndUpdate(req.body.id, { "orderStatus": req.body.status })
    if (orderProducts) {
      res.json({ msg: 'Order successful' });
    } else {
      res.json({ msg: 'something went worng' });
    }
  } catch (err) {

  }
});

const GetOrderProducts=(async (req, res) => {

  const { qSearch } = req.query;
  const keys = ["name", "price", "orderStatus"]
  const search = (validItems) => {
    return validItems.filter((items) =>
      // items.name.toLowerCase().includes(qSearch.toLowerCase()) ||
      // items.price.toLowerCase().includes(qSearch.toLowerCase())
      keys.some((key) => items[key].toLowerCase().includes(qSearch.toLowerCase()))//by using array we can write code in single line

    )
  }
  try {
    const data = await OrderProducts.find()
    if (req.query.userId) {
      const data = await OrderProducts.find({ "userId": req.query.userId })
      res.status(200).json({
        orderProducts: search(data)
      })
    } else {
      if (data) {
        res.status(200).json({
          orderProducts: search(data)
        })
      }
    }
  } catch (err) {

  }
});
const PostCart=(async (req, res) => {
  try {
    const cart = await Cart.create(req.body)
    if (cart) {
      res.json({ msg: 'Items is added' });
    } else {
      res.json({ msg: 'something went worng' });
    }
  } catch (err) {

  }
});

const GetCart=(async (req, res) => {
  try {
    const totalCart = await Cart.find({ "userId": req.query.userId })
    const data = await Cart.find({ "userId": req.query.userId })
    if (req.query.userId) {
      res.status(200).json({
        cart: data,
        totalCart: totalCart.length
      })
    }
  } catch (err) {

  }
});
const DeleteCart=(async (req, res) => {
  try {
    if (req.query.userId) {
      const data = await Cart.findByIdAndDelete(req.body._id)
      if (data) {
        res.status(200).json({ msg: "Item is removed" })
      } else { res.json({ msg: "Something is worong" }) }
    }
  } catch (err) {
  }
});

exports.PostProducts = PostProducts;
exports.PutProducts = PutProducts;
exports.DeleteProducts = DeleteProducts;
exports.DeleteFavoriteProducts = DeleteFavoriteProducts;
exports.GetProducts = GetProducts;
exports.OrderProduct = OrderProduct;
exports.CartOrderProduct = CartOrderProduct;
exports.PostFavoriteProducts = PostFavoriteProducts;
exports.GetFavoriteProducts = GetFavoriteProducts;
exports.PatchOrderProducts = PatchOrderProducts;
exports.GetOrderProducts = GetOrderProducts;
exports.PostCart = PostCart;
exports.GetCart = GetCart;
exports.DeleteCart = DeleteCart;

