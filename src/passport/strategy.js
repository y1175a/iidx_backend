const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../database/models');

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/api/auth/login/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
            try {
                const existUser = await User.findOne({
                    where: { u_uid: profile.id }
                });
                if (existUser) {
                    return done(null, existUser);
                } else {
                    const newUser = await User.create({
                        u_uid: profile.id,
                        u_email: profile._json && profile._json.email,
                        u_nick: '',
                    });
                    return done(null, newUser);
                }
            } catch (err) {
                return done(err);
            }
        }));
}