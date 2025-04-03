const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const User = require('../models/UserModel');
const UserToken = require('../models/UserTokenModel');

const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const JWT = require('../utils/jwt');

/**
 * @desc authenticate user (login)
 * @route POST /api/auth/login
 * @access public
 */
const login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        const authenticate = user && comparePassword(password.trim(), user.password);
        if (!authenticate) {
            throw new ApiError('Invalid credentials!', StatusCodes.UNAUTHORIZED, {
                credentials: { email, password },
            });
        }

        const accessToken = JWT.generate(user);
        const refreshToken = await JWT.refreshTokenGenerate(user);

        const responseData = {
            id: user.id,
            email: user.email,
            status: user.status,
            accessToken: accessToken,
            refreshToken: refreshToken,
        };

        res.status(StatusCodes.OK).json(ApiResponse('User logged in successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

/**
 * @desc get currently authenticated user (login)
 * @route GET /api/users/me
 * @access private
 */
// const getCurrentUser = AsyncHandler(async (req, res) => {
//     const responseData = req.user;
//     res.status(StatusCodes.OK).json(ApiResponse('Current user data.', { user: responseData }));
// });

/**
 * @desc get new token(JWT)
 * @route POST /api/auth/refresh/
 * @access public
 */

const refresh = AsyncHandler(async (req, res) => {
    const token = req.user.token;

    if (token == null) return res.status(StatusCodes.FORBIDDEN).json(ApiResponse('Refresh Token is required!.'));

    try {
        const userToken = await UserToken.findByToken(token);
        if (!userToken) {
            res.status(StatusCodes.FORBIDDEN).json(ApiResponse('Refresh token is not in database!.'));
            return;
        }
        if (JWT.verifyExpiration(userToken)) {
            await UserToken.findByIdAndDelete(userToken.id);
            res.status(StatusCodes.FORBIDDEN).json(
                ApiResponse('Refresh token was expired. Please make a new signin request')
            );
            return;
        }

        const user = await User.findById(req.user.id);
        if (!user) throw new ApiError('Invalid credentials!', StatusCodes.UNAUTHORIZED);

        const accessToken = JWT.generate(user);
        const refreshToken = await JWT.refreshTokenGenerate(user);

        const responseData = {
            id: user.id,
            email: user.email,
            status: user.status,
            accessToken: accessToken,
            refreshToken: refreshToken,
        };

        res.status(StatusCodes.OK).json(ApiResponse('User logged in successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    login,
    refresh,
};
