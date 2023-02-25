const express = require('express');
const Course = require('../models/populate/course');
const router = express.Router()
const Student = require('../models/populate/student')

router.post("/student", async (req, res) => {
    try {
            const userData =await Student.create(req.body);
            if (userData) {
              res.json({ msg: 'Student is added' });
            } else {
              res.json({ msg: 'something went worng' });
            }
      } catch (err) {
        console.log(err);
      }
});

router.get("/student", async (req, res) => {
  try {
    const data = await Student.find()
    .populate('subject')
    if (data) {
      res.status(200).json({
        studentDetails: data
      })
    } else {
      res.status(500).json({ msg: 'Something is wrong' });
    }

  } catch (err) {
    console.log(err);
  }
});
router.get("/course", async (req, res) => {
  try {
    const data = await Course.find()
    if (data) {
      res.status(200).json({
        courseDetails: data
      })
    } else {
      res.status(500).json({ msg: 'Something is wrong' });
    }

  } catch (err) {
    console.log(err);
  }
});
router.post("/course", async (req, res) => {
    try {
            const userData =await Course.create(req.body);
            if (userData) {
              res.json({ msg: 'Student is added' });
            } else {
              res.json({ msg: 'something went worng' });
            }
      } catch (err) {
        console.log(err);
      }
});
module.exports = router;
