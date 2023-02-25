const { Router } = require('express');
const app = Router();
const usersController = require("../controllers/usersController")
const uploadMiddleware = require("../utils/profileUpload")
app.post('/profile', uploadMiddleware.upload, usersController.PostProfile)
app.get('/user/:id', usersController.GetUser)
app.get('/user', usersController.GetAllUsers)
app.post('/register', usersController.PostRegister)
app.post('/login', usersController.PostLogin)
app.post('/message', usersController.PostMessage)
app.get('/message', usersController.GetMessage)

module.exports = app;
