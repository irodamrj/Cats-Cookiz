const createUserToken = (user) => {
  return {
    name: user.firstName,
    email: user.email,
    expiresIn: '14d',
  };
};

const createCookerToken = (cooker) => {
  return {
    userName: cooker.username,
    email: cooker.email,
    expiresIn: '14d',
  };
};

module.exports = { createUserToken, createCookerToken };
