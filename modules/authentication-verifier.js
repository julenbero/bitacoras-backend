/* global models */

//se define passport global para usarlo en todos los routes
passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;


passport.use('normal', new Strategy((token, done) => {
    models.User
        .findOne({ where: { token } })
        .then(session => {
            done(null, !!session);
        });
}
));

passport.use('admin', new Strategy((token, done) => {
    models.User
        .findOne({
            where: { token },
            include: [{ as: 'Role', model: models.Role }]
        })
        .then(user => {
            done(null, user && user.Role && user.Role.nombre === 'Administrador');
        });
}
));
