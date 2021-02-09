const passport = require('passport');
const google = require('./googleStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.uid);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { uid: id }})
            .then(user => done(null, user))
            .catch(err => done(err));
    })

    google();
}