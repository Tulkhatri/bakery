const express = require('express')
const router = express.Router()
const Person=require('../models/imageUploadModel')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({ storage: storage, filefilter: filefilter });
  
  router.post('/persons', upload.single('photo'), (req, res) => {
    const body = req.body;
  
    const person = new Person({
      name: body.name,
      number: body.number,
      photo: req.file.filename,
      // req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename,//this is optional for photo path
    });
    person
      .save()
      .then((savedPerson) => {
        res.json(savedPerson);
      })
      .catch((err) => console.log(err.message));
  });
  router.get('/persons', (req, res) => {
    Person.find({})
      .then((persons) => {
        res.json(persons);
      })
      .catch((err) => console.log(err.message));
  });

module.exports = router;
