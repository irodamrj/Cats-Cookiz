const createUserToken = (user) => {
  return {
    name: user.firstName,
    email: user.email,
    expiresIn: '14d',
  };
};

const createCookerToken = (cooker) => {
  return {
    username: cooker.username,
    email: cooker.email,
    expiresIn: '14d',
  };
};

const createAdminToken = (admin) => {
  return {
    username: admin.username,
    expiresIn: '14d',
  };
};

module.exports = { createUserToken, createCookerToken, createAdminToken };
