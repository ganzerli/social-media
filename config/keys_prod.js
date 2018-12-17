module.exports = {
  mongoURI: process.env.MONGO_URI, // from heroku
  aSuperSecretKey: process.env.SECRET_OR_KEY // secretOrKey is needed for the jwt Strategy
};
