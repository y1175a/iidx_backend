const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

module.exports = () => { 
    passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/login/callback'
}, async (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        try {
            const existUser = await User.findOne({
                where: { uid: profile.id }
            });
            if (existUser) {
                return cb(null, existUser);
            } else {
                const newUser = await User.create({
                    uid: profile.id,
                    email: profile._json && profile._json.email,
                    nickname: profile.displayName,
                });
                return cb(null, newUser);
            }
        } catch (err) {
            return cb(err);
        }
    }));
};