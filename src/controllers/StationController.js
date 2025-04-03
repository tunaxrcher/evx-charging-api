const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const Station = require('../models/StationModel');

const { options } = require('joi');
const { log } = require('winston');

const getAllStations = AsyncHandler(async (req, res) => {
    try {
        const stations = await Station.find();

        const responseData = stations;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getStation = AsyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const station = await Station.findById(id);

        const responseData = station;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const updateStation = AsyncHandler(async (req, res) => {
    const { id, description } = req.body;

    let options = {
        description: description,
    };

    try {
        const update = await Station.findByIdAndUpdate(id, options);

        if (!update) throw new ApiError('Internal Server Error! Server failed update station.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    getAllStations,
    getStation,
    updateStation,
};
