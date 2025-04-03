const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_SECRET_REFRESH_TOKEN } = require('./secrets');
const { logger } = require('./logger');

const User = require('../models/UserModel');
const UserToken = require('../models/UserTokenModel');

const generate = (user) => {
    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: '5m',
        algorithm: 'HS256',
    });

    return accessToken;
};

const refreshTokenGenerate = async (user) => {

    let expiredAt = new Date(new Date().toString())

    expiredAt.setSeconds(expiredAt.getSeconds() + 86400);

    const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET_REFRESH_TOKEN, {
        expiresIn: '1d',
        algorithm: 'HS256',
    });

    let userId = user.id;
    // let expiryDate = expiredAt.getTime();
    let expiryDate = expiredAt.toISOString().slice(0, 19).replace('T', ' '); 

    const userToken = new UserToken(userId, refreshToken, expiryDate);
    await userToken.save();

    return refreshToken;
};

const decode = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        logger.error(error);
    }
};

const verifyExpiration = (token) => {
    // let expiryDate = new Date(token.expiryDate)
    // return expiryDate.getTime() < new Date().getTime();
    return token.expiryDate.getTime() < new Date().getTime();
};

module.exports = {
    generate,
    refreshTokenGenerate,
    decode,
    verifyExpiration,
};
