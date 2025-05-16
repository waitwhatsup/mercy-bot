const express = require('express');
const router = express.Router();
const { getChasterClient, saveUser } = require('../auth');
const db = require('../db');

router.get('/me', async (req, res) => {
  const user = await db.query('SELECT * FROM users LIMIT 1');
  res.json(user.rows[0] || {});
});

router.get('/auth/login', async (req, res) => {
  const client = await getChasterClient();
  const url = client.authorizationUrl({
    scope: 'profile locks shared_locks keyholder',
    state: Math.random().toString(36).slice(2)
  });
  res.redirect(url);
});

router.get('/auth/callback', async (req, res) => {
  const client = await getChasterClient();
  const params = client.callbackParams(req);
  const tokenSet = await client.callback(process.env.CHASTER_REDIRECT_URI, params);
  const userinfo = await client.userinfo(tokenSet.access_token);

  await saveUser({
    chasterUserId: userinfo.sub,
    username: userinfo.preferred_username,
    accessToken: tokenSet.access_token,
    refreshToken: tokenSet.refresh_token,
  });

  res.redirect('/');
});

module.exports = router;
