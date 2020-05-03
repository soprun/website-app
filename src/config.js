/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

const base_url = `http://localhost:${process.env.PORT || 3000}`;
const clientUrl = process.env.API_CLIENT_URL || base_url;
const clientHost = clientUrl.replace(/http:\/\/|https:\/\//g, "");
const serverUrl = process.env.API_SERVER_URL || base_url;
const serverHost = serverUrl.replace(/http:\/\/|https:\/\//g, "");

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // default locale is the first one
  locales: ['en-US', 'ru-RU'],

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: clientUrl,
    clientHost: clientHost,

    // API URL to be used in the server-side code
    serverUrl: serverUrl,
    serverHost: serverHost,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || '',
      options: {
        expiresIn: '24h',
        // notBefore: '72h',
        algorithm: 'HS256',
        issuer: serverUrl,
        audience: clientUrl + '/protected',
      }
    },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '',
      secret: process.env.FACEBOOK_APP_SECRET || '',
    },

    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '',
      secret: process.env.GOOGLE_CLIENT_SECRET || '',
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || '',
      secret: process.env.TWITTER_CONSUMER_SECRET || '',
    },
  },
};
