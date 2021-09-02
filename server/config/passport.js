const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../model/userModel')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:'292714105483-h11m8tcpgmlj91i5vqj2namkqi0a399r.apps.googleusercontent.com',
        clientSecret: 'opvtaaVyTRMdplHl_SRdoqPf',
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const newUser = {
          googleId: profile.id,
          username: profile.displayName,

        }

        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
