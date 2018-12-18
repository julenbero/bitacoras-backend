var express = require('express');
var router = express.Router();
var object = require('../modules/objectsAndTypes');
var crypto = require('crypto');

router.get('/:id', (req, res, next) => {
  object.get('User', req.params.id, 1)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.post('/register', passport.authenticate('admin', { session: false }), (req, res, next) => {
  object.save([
    'email', 'password', 'firstName', 'lastName', 'birthday', 'role'
  ], req.query, 'User')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.put('/register/:id', passport.authenticate('admin', { session: false }), (req, res, next) => {
  let values = req.query;
  values.id = req.params.id;

  object.update([
    'email', 'password', 'firstName', 'lastName', 'birthday', 'role'
  ], values, 'User')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.delete('/delete/:id', passport.authenticate('admin', { session: false }), (req, res, next) => {
  object.delete('User', req.params.id)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.post('/login', (req, res, next) => {
  const password = crypto.createHmac('sha256', config.crypto.salt)
    .update(req.query.password)
    .digest('hex');

  models.User.findOne({
    where: {
      email: req.query.email,
      password: password,
    }
  }).then(user => {
    if (user) {
      const token = crypto.createHmac('sha256', config.crypto.salt)
        .update(`${user.id}-${user.email}-${Math.random()}`)
        .digest('hex')

      user.token = token;
      user.save();
      res.json({ status: true, content: user });
    } else {
      res.json({ status: false, content: 'Usuario no se Encuentra Creado' });
    }
  }).catch(message => {
    res.json({ status: false, content: 'error' });
  });
});

router.post('/logout', passport.authenticate('normal', { session: false }), (req, res, next) => {
  req.session.user.token = null;
  req.session.user.save();
  res.json({ status: true, content: 'Sesion Finalizada......' });
});

router.get('/records/:id', (req, res, next) => {
  const includes = {
    id: [
      { model: models.Record, as: 'Records' }
    ],
    all: [
      { model: models.Record, as: 'Records' }
    ]
  };

  object.get('User', req.params.id, 1, includes)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

module.exports = router;
