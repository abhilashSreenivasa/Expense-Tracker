const express = require('express')
const User=require('../models/user')
const bcrypt=require('bcrypt')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('login')
})
router.get('/login', (req, res) => {
    res.render('login')
  })


  router.post('/register', async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:hashedPassword
      })
        const newUser=await  user.save()
        res.redirect('/login')
    }
    catch{
        console.log('failed')
        res.redirect('/register')
    }

})

  router.get('/register', (req, res) => {
    res.render('register')
  })





router.post('/login',(req,res)=>{

})
module.exports = router