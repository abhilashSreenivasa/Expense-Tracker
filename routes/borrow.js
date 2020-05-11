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

router.put('/borrow',async(req,res)=>{
    const num=req.body.borrow    
    const user=await User.find({_id:req.user[0]._id})
    const money=await Money.find({email:user[0].email})
    money[0].borrowedMoney+=num
    console.log(money[0].borrowedMoney)
    try{
    await money[0].save()
    res.render('borrow',{money:money})
    }
    catch{
        console.log('catchhhhh')
        res.redirect('/borrow/borrow')
    }
    

})

module.exports=router

