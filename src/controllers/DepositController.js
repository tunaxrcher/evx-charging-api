const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const Deposit = require('../models/DepositModel');

const { options } = require('joi');
const { log } = require('winston');

const getAllDeposit = AsyncHandler(async (req, res) => {
    try {
        const deposits = await Deposit.find();

        const responseData = deposits;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getDeposit = AsyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const deposit = await Deposit.findById(id);

        const responseData = deposit;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const updateDeposit = AsyncHandler(async (req, res) => {
    const { id, status } = req.body;

    let options = {
        status: status,
    };

    try {
        const update = await Deposit.findByIdAndUpdate(id, options);

        if (!update) throw new ApiError('Internal Server Error! Server failed update deposit.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    getAllDeposit,
    getDeposit,
    updateDeposit,
};
