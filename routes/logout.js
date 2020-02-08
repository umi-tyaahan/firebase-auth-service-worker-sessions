var express = require('express');
var router = express.Router();

const { admin, getIdToken } = require('../lib/firebaseService');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('logout', { title: 'Logout'});
});

module.exports = router;
