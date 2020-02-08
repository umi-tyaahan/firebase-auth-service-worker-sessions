'use strict';
const admin = require('firebase-admin');

// Initialize Admin SDK.
if(process.env.NODE_ENV === 'production') {
  admin.initializeApp();
}else{
  admin.initializeApp({
    credential: admin.credential.cert('./serviceAccountKeys.json')
  });
}

function verifyToken(req, res, next) {
  // Get ID token.
  const idToken = getIdToken(req);
  // Get the ID token and verify it.
  admin.auth().verifyIdToken(idToken)
    .then((decodedClaims) => {
      // Serve content for signed in user.
      //return serveContentForUser('/profile', req, res, decodedClaims);
      next();
    }).catch((error) => {
      // Force user to login.
      res.redirect('/');
    });
}

function getIdToken(req) {
  const authorizationHeader = req.headers.authorization || '';
  const components = authorizationHeader.split(' ');
  return components.length > 1 ? components[1] : '';
}

module.exports = {
  admin,
  verifyToken,
  getIdToken
}