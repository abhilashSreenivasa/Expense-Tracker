const express = require('express')
const User=require('../models/user')
const Money=require('../models/money')
const passport=require('passport')
const router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const user=await User.find({_id:req.user[0]._id})
        const money=await Money.find({email:user[0].email})
        res.render('borrow',{money:money})
    }
    catch{
        res.redirect('/')
    }
})

router.put('/',async(req,res)=>{

    try{
    const num=parseInt(req.body.borrow+"")
    const user=await User.find({_id:req.user[0]._id})
    const money=await Money.find({email:user[0].email})


    money[0].borrowedMoney+=num
    money[0].totalMoney+=num
    money[0].borrowHistory.push({
        from:req.body.from,
        description:req.body.description,
        amount:req.body.borrow
    })
    await money[0].save()
    res.render('borrow',{money:money})
    }

    catch{
        
        res.redirect('/borrow')
    }
    

})

module.exports=router

