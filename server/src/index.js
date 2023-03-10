const express = require('express')
const app = express()

require('dotenv').config()
const cors = require('cors')
const connect=require('./db/connect')
const userRouter=require('./routes/userRouter')
const productsRouter=require('./routes/productsRouter')
//for socket
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
        origin: "*",
    },
});
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
  });
//for socket

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(productsRouter)
connect();
server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})