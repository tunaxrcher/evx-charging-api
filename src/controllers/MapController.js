const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const MapModel = require('../models/MapModel');

const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { options } = require('joi');
const { log } = require('winston');

const getEvStationDetailMap = AsyncHandler(async (req, res) => {
    try {
        const getEvStationDetailMap = await MapModel.getEvStationDetailMap();

        if (!getEvStationDetailMap) throw new ApiError('Internal Server Error! Server failed get connector data.');

        const responseData = getEvStationDetailMap;

        res.status(StatusCodes.OK).json(
            ApiResponse('get connector status successfully.', responseData, StatusCodes.OK)
        );
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    getEvStationDetailMap,
};