const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.SECRET_KEY);

const attachCookiesToResponse = (res, userPayload) => {
  const token = createJWT(userPayload);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 14 * 1000,
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
