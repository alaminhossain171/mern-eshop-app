const { User } = require("../models/user");
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const userList = await User.find().select('name email phone');

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get(`/:id`, async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId).select('name email phone');
  
      if (user) {
        res.status(200).json({
          success: true,
          user: user,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
   
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID format",
        });
      }
  
      // Handle other errors
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  });
  

router.post("/", async (req, res) => {
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        street: req.body.street,
      });
  
      const savedUser = await newUser.save();
  
      if (!savedUser) {
        return res.status(500).json({
          success: false,
          error: "The user could not be created.",
        });
      }
  
      res.status(201).json({
        success: true,
        user: savedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
      const secret=process.env.JWT_SECRET
      const token = jwt.sign(
        {
          userId: user.id,
         isAdmin:user.isAdmin,
        },
        secret, 
        {
          expiresIn: '7d',
        }
      );
  
      res.status(200).json({
        success: true,
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin:user.isAdmin,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });
  
  router.post('/register', async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }
  
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
      });
  
      const savedUser = await newUser.save();
  
      if (!savedUser) {
        return res.status(500).json({
          success: false,
          message: "The user could not be created",
        });
      }
  
      res.status(201).json({
        success: true,
        user: savedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
  

  router.put('/:id',async (req, res)=> {

    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
});

router.delete('/:id', (req, res)=>{
  User.findByIdAndDelete(req.params.id).then(user =>{
      if(user) {
          return res.status(200).json({success: true, message: 'the user is deleted!'})
      } else {
          return res.status(404).json({success: false , message: "user not found!"})
      }
  }).catch(err=>{
     return res.status(500).json({success: false, error: err}) 
  })
})

router.get(`/get/count`, async (req, res) =>{
  const userCount = await User.countDocuments()

  if(!userCount) {
      res.status(500).json({success: false})
  } 
  res.send({
      userCount: userCount
  });
})

module.exports = router;
