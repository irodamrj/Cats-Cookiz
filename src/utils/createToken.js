const createUserToken = (user) => {
  return {
    name: user.firstName,
    email: user.email,
    exp: 14 * 24 * 3600,
  };
};

const createCookerToken = (cooker) => {
  return {
    userName: cooker.username,
    email: cooker.email,
    exp: 14 * 24 * 3600,
  };
};

module.exports = { createUserToken, createCookerToken };
