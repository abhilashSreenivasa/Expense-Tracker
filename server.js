if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const flash=require('express-flash')
const session=require('express-session')
const passport=require('passport')
const methodOverride=require('method-override')

const indexRouter = require('./routes/index')
const borrowRouter = require('./routes/borrow')
const lendRouter=require('./routes/lend')
const activityRouter=require('./routes/activity')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: 'secret',                                           
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/borrow',borrowRouter)
app.use('/lend',lendRouter)
app.use('/activity',activityRouter)

app.listen(process.env.PORT || 3000)