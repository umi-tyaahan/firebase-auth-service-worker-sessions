import firebase from 'firebase/app';
import 'firebase/auth';
import * as config from './config.js';

firebase.initializeApp(config);

self.addEventListener('install', function (event) {
  // Perform install steps
  console.log('install ok!');
  //if chache use : setchache here
});

// Service Worker アクティベート時に実行される
self.addEventListener('activate', (event) => {
  console.info('activate', event);
});

self.addEventListener("fetch", function (event) {
  //console.log(`event call from : ${event.request.url}`)

  const proxy = async function () {
    // check outbound connection
    if (!isSameOrigin(event.request.url)) {
      return await fetch(event.request);
    }

    // check login
    const idToken = await getIdToken();
    console.log('idToken',idToken);
    if (!idToken) {
      return await fetch(event.request);
    }

    const req = addAuthorizeation(event.request, idToken);

    return await fetch(req);
  }

  event.respondWith(proxy());

})

function addAuthorizeation(request, idToken) {
  let req = request.clone();

  // Clone headers as request headers are immutable.
  const headers = new Headers();
  for (let entry of req.headers.entries()) {
    headers.append(entry[0], entry[1]);
  }
  // add firebase auth token
  headers.append('Authorization', 'Bearer ' + idToken);

  try {
    req = new Request(req.url, {
      method: req.method,
      headers: headers,
      mode: 'same-origin',
      credentials: req.credentials,
      cache: req.cache,
      redirect: req.redirect,
      referrer: req.referrer,
      body: req.body,
      bodyUsed: req.bodyUsed,
      context: req.context
    });
  } catch (e) {
    // This will fail for CORS requests. We just continue with the
    // fetch caching logic below and do not pass the ID token.
  }
  return req
}

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log('user signed in', user.uid);
//   } else {
//     console.log('user signed out');
//   }
// });

async function getIdToken() {
  let idToken;
  try {
    idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
  } catch (err) {
    idToken = null
  }
  return idToken;
}

function isSameOrigin(url) {
  let retval = false;

  if (self.location.origin === new URL(url).origin) {
    if ((self.location.protocol === 'https:') || (self.location.hostname === 'localhost')) {
      retval = true;
    }
  }

  //console.log('sameorigin',retval,url, self.location.origin, new URL(url).origin , self.location.protocol);

  return retval;
}