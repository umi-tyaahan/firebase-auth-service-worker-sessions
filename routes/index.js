var express = require('express');
var router = express.Router();

const { admin, getIdToken } = require('../lib/firebaseService');

/* GET home page. */
router.get('/', async function (req, res, next) {

  if (!req.headers.authorization) {
    console.log(`not auth`);
    res.render('index', { title: 'Express' });
    return
  }

  const idToken = getIdToken(req);

  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const user = await admin.auth().getUser(decodedToken.sub);

  res.render('index', { title: 'Express', user: user });
  return
});

module.exports = router;
