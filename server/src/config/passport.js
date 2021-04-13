const { Strategy: JwtStrategy} = require('passport-jwt');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');

const jwtOptions = {
  secretOrKey: 'StRoNGs3crE7',
  jwtFromRequest: (req) => {
      var token = null;
      if (req && req.signedCookies) {
        token = req.signedCookies.token;
        console.log(token);
        return token;
      } else {
        return null;
      }
    }
};

const jwtVerify = async (payload, done) => {
  console.log(payload);
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
