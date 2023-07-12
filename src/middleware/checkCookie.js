const checkCookie = async (req, res, next) => {
  if (req.signedCookies['token']) {
    return res.send('Already signed in');
  } else {
    next();
  }
};

module.exports = checkCookie;
