const passport = require('passport');
const router = require('express').Router();
const SpotifyStrategy = require('passport-spotify').Strategy;
const {User} = require('../db/models');
module.exports = router;

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

const spotifyConfig = {
  clientID: process.env.Spotify_CLIENT_ID,
  clientSecret: process.env.Spotify_CLIENT_SECRET,
  callbackURL: process.env.Spotify_CALLBACK
}

const strategy = new SpotifyStrategy(spotifyConfig, (token, refreshToken, profile, done) => {
  const spotifyId = profile.id;
  const name = profile.username;
  const email = profile.emails[0].value;
  const followers = profile.followers;
  const accessToken = token;

  User.find({where: {spotifyId}})
    .then(user => user
      ? done(null, user)
      : User.create({spotifyId, name, email, followers, accessToken})
        .then(user => done(null, user))
    )
    .catch(done)
})

passport.use(strategy)

router.get('/', passport.authenticate('spotify' , {scope: ['user-read-email', 'user-read-private'], showDialog: true}),
  (req, res, next) => {
})

router.get('/callback', passport.authenticate('spotify', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))