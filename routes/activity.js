const express = require('express')
const User=require('../models/user')
const Money=require('../models/money')
const passport=require('passport')
const router = express.Router()

router.get('/',async(req,res)=>{
    try{
        
        const user=await User.find({_id:req.user[0]._id}) 
        const money=await Money.find({email:user[0].email})
        res.render('activity',{money:money})
    }
    catch{
        res.redirect('/')
    }
    
})

router.delete('/:id',async(req,res)=>{
        try{
            const user=await User.find({_id:req.user[0]._id})
           const number=await Money.find({email:user[0].email})
            
         
           console.log(number)


         

         await Money.findOneAndUpdate(
            { email: req.user[0].email },
            { $pull: { borrowHistory: { _id: req.params.id} } },
            { returnOriginal: false},
            function(err) {
                if (err) { console.log(err) }
            }
        )
        const money=await Money.find({email:user[0].email})
        const deleted_number=await number[0].borrowHistory.find(o=>o._id==req.params.id)
        money[0].totalMoney-=deleted_number.amount
        money[0].borrowedMoney-=deleted_number.amount
        console.log(money)
            res.render('activity',{money:money})
        }
        catch(e){
            console.error(e)
            res.redirect('/')
        }
})




module.exports=router

