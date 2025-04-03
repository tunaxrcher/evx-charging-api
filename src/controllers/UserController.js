const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const User = require('../models/UserModel');
const Password = require('../models/PasswordModels');

const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { options } = require('joi');
const { log } = require('winston');

const getAllUsers = AsyncHandler(async (req, res) => {
    try {
        const users = await User.find();

        const responseData = users;

        res.status(StatusCodes.OK).json(ApiResponse('User Get is successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getUser = AsyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        // ไม่เจอยูส
        if (!user) throw new ApiError('Invalid credentials!', StatusCodes.UNAUTHORIZED);

        const responseData = {
            id: user.id,
            phone: user.phone,
            status: user.status,
            email: user.email,
            fullname: user.fullname,
        };

        res.status(StatusCodes.OK).json(ApiResponse('User Get is successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const createUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const isHaveUser = await User.findByEmail(email);

    // มียูสแล้ว
    if (isHaveUser) return res.status(StatusCodes.OK).json(ApiResponse('User already.', '', 999));

    try {
        const user = new User(email, hashPassword(password.trim()));
        const createUser = await user.save();

        if (!createUser) throw new ApiError('Internal Server Error! Server failed creating new user.');

        const responseData = {};

        res.status(StatusCodes.CREATED).json(ApiResponse('User registered successfully.', responseData, StatusCodes.CREATED));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const updateUser = AsyncHandler(async (req, res) => {
    const { fullname, id } = req.body;

    let options = {
        fullname: fullname,
    };

    try {
        const update = await User.findByIdAndUpdate(id, options);

        if (!update) throw new ApiError('Internal Server Error! Server failed creating update User.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('User updated successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const changePassword = AsyncHandler(async (req, res) => {
    const { id, oldPass, newPass, confNewPass } = req.body;

    let options = {
        id: id,
        password: oldPass,
        newPassword: hashPassword(newPass.trim()),
        confNewPassword: hashPassword(confNewPass.trim()),
    };

    try {
        const changePassword = await Password.findByIdAndUpdatePassword(id, options);

        if (!changePassword) throw new ApiError('Internal Server Error! Server failed update password.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('password updated successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    changePassword,
};
