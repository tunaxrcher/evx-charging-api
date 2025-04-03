const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const ChargePoint = require('../models/ChargePointModel');

const { options } = require('joi');
const { log } = require('winston');

const getAllChargePoints = AsyncHandler(async (req, res) => {
    try {
        const chargePoints = await ChargePoint.find();

        const responseData = chargePoints;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getChargePoint = AsyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const chargePoint = await ChargePoint.findById(id);

        const responseData = chargePoint;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getChargePointByStatus = AsyncHandler(async (req, res) => {

    const { status } = req.body;

    try {
        const chargePoints = await ChargePoint.findByStatus(status);

        const responseData = chargePoints;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});


const updateChargePoint = AsyncHandler(async (req, res) => {
    const { id, status } = req.body;

    let options = {
        status: status,
    };

    try {
        const update = await ChargePoint.findByIdAndUpdate(id, options);

        if (!update) throw new ApiError('Internal Server Error! Server failed update charge point.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    getAllChargePoints,
    getChargePoint,
    getChargePointByStatus,
    updateChargePoint,
};
