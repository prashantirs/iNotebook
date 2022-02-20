const express=require('express');
const User = require('../models/User');
const router=express.Router();

//bcrypt npm package for salting in password
const bcrypt = require('bcryptjs');

//express validator
const { body, validationResult } = require('express-validator');

//jwt token
var jwt = require('jsonwebtoken');
const JWT_SECRET="PrashantIsGood";




//ROUTE:1
// Create a user using post "api/auth/createuser" request  No login require
router.post('/createuser',[

    body('name').isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
    
],async(req,res)=>{
    //any error occured send bad request --->express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check weather user with this email exists or not
    try {
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({ errors: "Sorry a user already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create new user
        user=await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
          })

          const data={
              user:{
                  id:user.id
              }
          }
          const authtoken=jwt.sign(data,JWT_SECRET);
        //   res.send(user);
        res.json(authtoken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
   

})




//ROUTE:2
//Authenticate user using post "api/auth/login" request
router.post('/login',[

    body('email').isEmail(),
    body('password').exists(),
    
],async(req,res)=>{
     //any error occured send bad request --->express validator
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

    const{email,password}=req.body;
    
        //check weather user with this email exists or not
        try {
            let user=await User.findOne({email});
            //if user dont exist
            if(!user){
                return res.status(400).json({ errors: "Please enter correct login credentials" });
            }
    
            const passwordCompare = await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res.status(400).json({ errors: "Please enter correct login credentials" }); 
            }
          
              const data={
                  user:{
                      id:user.id
                  }
              }
              const authtoken=jwt.sign(data,JWT_SECRET);
            
            res.json(authtoken);
    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }


})

module.exports=router;