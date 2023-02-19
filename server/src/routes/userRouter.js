const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const bcrypt = require('bcrypt')
const multer = require('multer')
const jwt = require('jsonwebtoken');
const Message = require('../models/message')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/uploads/profile')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)

  }
});
const upload = multer({ storage: storage })
router.post('/profile', upload.single('avatar'), async (req, res, next) => {
  try {
    const data = await Users.findByIdAndUpdate(req.body._id, { avatar: req.file.filename })//imageName lai update garne but req.file.filename ma j aauxa tehi banaune
    if (data) {
      res.status(200).json({
        userDetails: data,
        msg: 'Profile updated'
      })
    } else {
      res.status(500).json({ msg: 'Something is wrong' });
    }

  } catch (err) {
    res.status(409).json({ msg: 'Error' });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const data = await Users.findById(req.params.id)

    if (data) {
      res.status(200).json({
        userDetails: data
      })
    } else {
      res.status(500).json({ msg: 'Something is wrong' });
    }

  } catch (err) {
    console.log(err);
  }
});
router.get("/user", async (req, res) => {
  try {
    const data = await Users.find()

    if (data) {
      res.status(200).json({
        userDetails: data
      })
    } else {
      res.status(500).json({ msg: 'Something is wrong' });
    }

  } catch (err) {
    console.log(err);
  }
});

router.post('/register', async (req, res) => {
  try {
    const hash = await bcrypt.hashSync(req.body.password, 10);
    Users.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        req.body.password = hash
        const userData = Users.create(req.body);
        if (userData) {
          res.json({ msg: 'Account is created' });
        } else {
          res.json({ msg: 'something went worng' });
        }
      } else {
        res.status(409).json({ error: 'Email already exists' });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.post('/login', async (req, res) => {
  const user = await Users.findOne({ email: req.body.email }).lean()
  if (user) {
    try {
      const { email, password } = user;
      const isMatched = bcrypt.compareSync(req.body.password, password)
      const token = jwt.sign({ email: req.body.email }, process.env.SECRET_TOKEN);
      user.token = token;
      if (email && isMatched) {
        const { password, ...refactoredUserObj } = user
        res.status(200).json({
          msg: 'Logged in success',
          userList: refactoredUserObj,//if we needed all data of user we just send user and not need to lean()but when we want to refactor user and take user without any one or mor field like password we need to remove internal cache by using lean()for porpor display
          sendEmail: email
        })
      }
      else {
        res.status(401).json({
          errorMsg: 'Unauthorized user'
        })
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  else {
    res.status(401).json({
      errorMsg: 'User does not exist'
    })
  }

});
router.post('/message', async (req, res) => {
  try {
    const data = await Message.create(req.body);
    if (data) {
      res.json({ msg: 'Message has been send' });
    } else {
      res.json({ msg: 'something went worng' });
    }
  } catch (err) {
    console.log(err);
  }
});
router.get('/message', async (req, res) => {
  try {

    const data = await Message.find({"userId": req.query.userId});
    if (req.query.userId) {
      res.json({ messageData: data });
    } else {
      res.json({ msg: 'something went worng' });
    }

  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
