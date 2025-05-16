const { Issuer } = require('openid-client');
const { query } = require('./db');

let chasterClient;

async function getChasterClient() {
  if (chasterClient) return chasterClient;
  const issuer = await Issuer.discover('https://sso.chaster.app/auth/realms/app/.well-known/openid-configuration');
  chasterClient = new issuer.Client({
    client_id: process.env.CHASTER_CLIENT_ID,
    client_secret: process.env.CHASTER_CLIENT_SECRET,
    redirect_uris: [process.env.CHASTER_REDIRECT_URI],
    response_types: ['code'],
  });
  return chasterClient;
}

async function saveUser({ chasterUserId, username, accessToken, refreshToken }) {
  await query(
    `INSERT INTO users (chaster_user_id, username, access_token, refresh_token)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (chaster_user_id) DO UPDATE SET
     username = $2, access_token = $3, refresh_token = $4`,
    [chasterUserId, username, accessToken, refreshToken]
  );
}

module.exports = { getChasterClient, saveUser };
