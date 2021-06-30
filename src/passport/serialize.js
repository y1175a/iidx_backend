const passport = require('koa-passport');
const { Users } = require('../../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Users.findOne({ where: { id: id }})
            .then(user => {
                return done(null, user)
            })
            .catch(err => done(err));
    })
}