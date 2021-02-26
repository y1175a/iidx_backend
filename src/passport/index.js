const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id: id }})
            .then(user => done(null, user))
            .catch(err => done(err));
    })

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/api/auth/login/callback'
    }, async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            try {
                const existUser = await User.findOne({
                    where: { uid: profile.id }
                });
                console.log("test:", existUser);
                if (existUser) {
                    return done(null, existUser);
                } else {
                    const newUser = await User.create({
                        uid: profile.id,
                        email: profile._json && profile._json.email,
                        roletype: 1,
                        nickname: 'abc',
                    });
                    return done(null, newUser);
                }
            } catch (err) {
                return done(err);
            }
        }));
}