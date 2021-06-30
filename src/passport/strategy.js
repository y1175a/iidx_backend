const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../../models');

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/api/auth/login/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
            try {
                const existUser = await Users.findOne({
                    where: { uid: profile.id }
                });
                if (existUser) {
                    return done(null, existUser);
                } else {
                    const now = new Date();
                    const newUser = await Users.create({
                        uid: profile.id,
                        email: profile._json && profile._json.email,
                        roletype: 1,
                        nickname: 'user' + String(now.getTime()),
                    });
                    return done(null, newUser);
                }
            } catch (err) {
                return done(err);
            }
        }));
}