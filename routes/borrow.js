const express = require('express')
const User=require('../models/user')
const Money=require('../models/money')
const passport=require('passport')
const router = express.Router()

router.get('/borrow',async(req,res)=>{
    try{
        
        const user=await User.find({_id:req.user[0]._id})
        console.log(user)
        const money=await Money.find({email:user[0].email})
        res.render('borrow',{money:money})
    }
    catch{
        res.redirect('/')
    }
   
    
    
})

module.exports=router

