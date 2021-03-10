const passport = require('koa-passport');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id: id }})
            .then(user => {
                return done(null, user)
            })
            .catch(err => done(err));
    })
}