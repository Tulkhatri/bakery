const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Message = require('../models/message')

const PostProfile=(async (req, res, next) => {
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

const GetUser=(async (req, res) => {
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
const GetAllUsers=(async (req, res) => {
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

const PostRegister=(async (req, res) => {
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
const PostLogin=(async (req, res) => {
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
const PostMessage=(async (req, res) => {
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
const GetMessage=(async (req, res) => {
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
exports.PostProfile = PostProfile;
exports.GetUser = GetUser;
exports.GetAllUsers = GetAllUsers;
exports.PostRegister = PostRegister;
exports.PostLogin = PostLogin;
exports.PostMessage = PostMessage;
exports.GetMessage = GetMessage;
