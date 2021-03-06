const express = require('express')
const User=require('../models/user')
const Money=require('../models/money')
const router = express.Router()
let message="";
router.get('/',async(req,res)=>{
    try{
        
        const user=await User.find({_id:req.user[0]._id})
        
        const money=await Money.find({email:user[0].email})
        res.render('lend',{
            money:money,
            message:message
        })
    }
    catch{
        res.redirect('/')
    }
    
})

router.put('/',async(req,res)=>{
    try{
    const num=parseInt(req.body.lend+"")
    const user=await User.find({_id:req.user[0]._id})
    const money=await Money.find({email:user[0].email})
    if(num<=money[0].totalMoney){
    money[0].lentMoney+=num
    money[0].totalMoney-=num
    await money[0].lendHistory.push({
        to:req.body.to,
        description:req.body.description,
        amount:req.body.lend
    })

    await money[0].save()
    res.render('lend',{
        money:money,
        message:message
    
})
    }
    else{
        res.render('lend',{money:money,
            message:"You don't have enough balance"})
    }
    }
    
    catch(e){
        console.error(e)
        res.redirect('/lend')
    }
    

})

module.exports=router

