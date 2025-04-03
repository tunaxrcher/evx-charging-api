const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const Withdraw = require('../models/WithdrawModel');

const { options } = require('joi');
const { log } = require('winston');

const getAllWithdraw = AsyncHandler(async (req, res) => {
    try {
        const withdraws = await Withdraw.find();

        const responseData = withdraws;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getWithdraw = AsyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const withdraw = await Withdraw.findById(id);

        const responseData = withdraw;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const updateWithdraw = AsyncHandler(async (req, res) => {
    const { id, status } = req.body;

    let options = {
        status: status,
    };

    try {
        const update = await Withdraw.findByIdAndUpdate(id, options);

        if (!update) throw new ApiError('Internal Server Error! Server failed creating update User.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    getAllWithdraw,
    getWithdraw,
    updateWithdraw,
};
