const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('./data/database');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const usersCollection = mongodb.getDatabase().db('PokemonPlatnium').collection('users');

      // Check if this GitHub user already exists in our DB
      let user = await usersCollection.findOne({ githubId: profile.id });

      if (!user) {
        // First time logging in with GitHub — create a record
        const newUser = {
          githubId: profile.id,
          username: profile.username,
          role: 'user', // default role; promote to admin manually in MongoDB
          createdAt: new Date()
        };
        const result = await usersCollection.insertOne(newUser);
        user = { ...newUser, _id: result.insertedId };
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// Stores user.id into the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Retrieves the full user object from MongoDB using the id stored in session
passport.deserializeUser(async (id, done) => {
  try {
    const ObjectId = require('mongodb').ObjectId;
    const usersCollection = mongodb.getDatabase().db('PokemonPlatnium').collection('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;