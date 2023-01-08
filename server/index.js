const express = require('express')
const app = express()
const port = 3005
const cors = require('cors')
const mongoose = require('mongoose');
app.use(express.json())
app.use(cors())

const connect=async()=>{
    try{
          await mongoose.connect('mongodb://127.0.0.1:27017/live_bakery', {useNewUrlParser: true, useUnifiedTopology: true});
          console.log("connected to mongodb");
      }catch(error){
          console.error(error);
      }
    }
connect();

const userSchema=new mongoose.Schema({
    name:{type:String},
    address:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    password:{type:String},

},{collection:"users"});

const Users=mongoose.model("users",userSchema)

app.post('/register', (req, res) => {
    res.send('Hello World!')
    Users.create(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})