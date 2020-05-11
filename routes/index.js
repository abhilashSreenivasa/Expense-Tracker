if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
const express = require('express')
const User=require('../models/user')
const Money=require('../models/money')
const bcrypt=require('bcrypt')
const passport=require('passport')
const initializePassport=require('../passport-config')
const router = express.Router()
initializePassport(passport,
    async (email)=>{
      
    return await User.find({email:email})
},
async (id)=>{
    
    return await User.find({_id:id})
}
)


router.get('/',checkAuthenticated,async (req, res) => {
   
    const money=await Money.find({email:req.user[0].email})
    
  res.render('home',
  {user: req.user[0],
   money:money})
})





router.get('/login',checkNotAuthenticated, (req, res) => {
    res.render('login')
  }) 


  router.post('/register',checkNotAuthenticated, async (req,res)=>{
      
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:hashedPassword
      })
      const newUser=await  user.save()
        const money=new Money({
            email:req.body.email
        })
        
        const newMoney=await money.save()
        console.log(newMoney)
        res.redirect('/login')
    }
    catch{
        console.log('failed')
        res.redirect('/register')
    }

})

  router.get('/register',checkNotAuthenticated, (req, res) => {
    res.render('register')
  })





router.post('/login',checkNotAuthenticated,passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
    
})
)

router.delete('/logout',(req,res)=>{
    req.logout()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  

module.exports = router