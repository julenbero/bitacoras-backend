/* global models */

//se define passport global para usarlo en todos los routes
passport = require('passport');
passportAdmin = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

passport.use(new Strategy((token, done) => {
    models.User
        .findOne({ where: { token } })
        .then(session => {
            done(null, !!session);
        });
}
));

passportAdmin.use(new Strategy((token, done) => {
    models.User
        .findOne({ where: { token } })
        .then(user => {
            done(null, user && user.Role && user.Role.nombre === 'administrador');
        });
}
));
