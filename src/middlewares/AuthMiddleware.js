const { JWT_SECRET, JWT_SECRET_REFRESH_TOKEN } = require('../utils/secrets');

const jwt = require('jsonwebtoken');
const AsyncHandler = require('express-async-handler');
const AuthError = require('./error/AuthError');

const { TokenExpiredError } = jwt;
const { StatusCodes } = require('http-status-codes');

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        throw new AuthError('Access Token expired!', StatusCodes.UNAUTHORIZED);
    }

    throw new AuthError('Unauthorized!', StatusCodes.FORBIDDEN);
};

const jwtValidate = AsyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // extract token
        token = req.headers.authorization.split(' ')[1];

        // verify token
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return catchError(err, res);

            req.userId = decoded.id;

            next();
        });
    }

    if (!token) throw new AuthError('Unauthorized!, JWT Token not found', StatusCodes.UNAUTHORIZED);
});

const jwtRefreshTokenValidate = AsyncHandler(async (req, res, next) => {
    if (!req.headers['authorization']) throw new AuthError('Unauthorized!', StatusCodes.UNAUTHORIZED);

    const token = req.headers['authorization'].replace('Bearer ', '');

    jwt.verify(token, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
        if (err) return catchError(err, res);

        req.user = decoded;
        req.user.token = token;
        delete req.user.exp;
        delete req.user.iat;
    });

    next();
});

module.exports = {
    jwtValidate,
    jwtRefreshTokenValidate,
};
