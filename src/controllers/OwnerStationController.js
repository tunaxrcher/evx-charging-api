const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const OwnerStation = require('../models/OwnerStationModel');

const { options } = require('joi');
const { log } = require('winston');

const getAllOwnerStations = AsyncHandler(async (req, res) => {
    try {
        const OwnerStations = await OwnerStation.find();

        const responseData = OwnerStations;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getOwnerStation = AsyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const ownerStation = await OwnerStation.findById(id);

        const responseData = ownerStation;

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const updateOwnerStation = AsyncHandler(async (req, res) => {
    const { id, description } = req.body;

    let options = {
        description: description,
    };

    try {
        const update = await OwnerStation.findByIdAndUpdate(id, options);

        if (!update) throw new ApiError('Internal Server Error! Server failed update owner station.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    getAllOwnerStations,
    getOwnerStation,
    updateOwnerStation,
};
