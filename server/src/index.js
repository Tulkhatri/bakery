const express = require('express')
const app = express()

require('dotenv').config()
const cors = require('cors')
const connect=require('./db/connect')
const userRouter=require('./routes/userRouter')
const productsRouter=require('./routes/productsRouter')
const imageUploadRoute=require('./routes/imageUploadRoute')

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(productsRouter)
app.use(imageUploadRoute)
connect();
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})