const jwt = require('jsonwebtoken');
// const redis = require('..')


const generateTokens = (user) => {
    const accessToken = jwt.sign({user} , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({user} , process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
}

const storeRefreshToken = async ({user}, refreshToken) => {
    // try {
    //     await redis.set(user.id, refreshToken);
    // } catch (error) {
    //     // console.error(error);
    // }
  };

module.exports = {
    generateTokens,
    storeRefreshToken
};
