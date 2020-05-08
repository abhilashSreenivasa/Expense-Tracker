const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
   

    try {
        const user =await getUserByEmail(email)
     
        if (user == null || user[0]==undefined) {
          return done(null, false, { message: 'No user with that email' })
        }
       
      if (await bcrypt.compare(password, user[0].password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user[0]._id))
  passport.deserializeUser(async(id, done) => {
      
    return done(null,await getUserById(id))
  })
}

module.exports = initialize