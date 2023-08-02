const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Customer = require('../models/customer');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GAPP_CLIENT_ID,
      clientSecret: process.env.GAPP_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/customer/google/callback',
      // profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'name'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      //   console.log(profile);
      const email = profile._json.email;
      let user = await Customer.findOne({ email: email });
      if (user) {
        cb(null, user);
      } else {
        user = await Customer.create({
          firstName: profile.displayName.split(' ')[0],
          lastName: profile.displayName.split(' ')[1],
          providerId: `google-${profile.id}`,
          email: email,
          profilePicture: profile._json.picture,
        });

        cb(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
    },
    async function (accessToken, refreshToken, profile, cb) {
      const email = profile._json.email;
      let user = await Customer.findOne({ email: email });
      if (user) {
        cb(null, user);
      } else {
        user = await Customer.create({
          firstName: profile.displayName.split(' ')[0],
          lastName: profile.displayName.split(' ')[1],
          providerId: `facebook-${profile.id}`,
          email: email,
          profilePicture: profile._json.picture,
        });
        cb(null, user);
      }
    }
  )
);
