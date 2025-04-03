const AsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('./error/ApiError');
const ApiResponse = require('./response/ApiResponse');

const SteveData = require('../models/SteveDataModel');

const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { options } = require('joi');
const { log } = require('winston');

const getStation = AsyncHandler(async (req, res) => {
    const { charge_box_id } = req.body;

    try {
        const evstation = await SteveData.findEVStationByName(charge_box_id);

        // ไม่เจอ station
        if (!evstation) throw new ApiError('Invalid credentials!', StatusCodes.UNAUTHORIZED);

        const responseData = {
            charge_box_id: evstation.charge_box_id,
        };

        res.status(StatusCodes.OK).json(ApiResponse('User Get is successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getConnecter = AsyncHandler(async (req, res) => {
    const { charge_box_id } = req.body;

    try {
        const connecter = await SteveData.findEVStationConnecterByName(charge_box_id);

        const responseData = connecter;

        res.status(StatusCodes.OK).json(ApiResponse('Connecter Get is successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getConnecterStatus = AsyncHandler(async (req, res) => {
    const { ev_chargepoint_name, connector_pk } = req.body;

    try {
        const connecter = await SteveData.findEVStationConnecterStatus(ev_chargepoint_name, connector_pk);

        const responseData = connecter;

        res.status(StatusCodes.OK).json(ApiResponse('Connecter Status Get is successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getStartTransectionLast = AsyncHandler(async (req, res) => {
    const { connector_pk, id_tag } = req.body;

    try {
        const connecter = await SteveData.findStartTrasectionLast(connector_pk, id_tag);

        const responseData = connecter;

        res.status(StatusCodes.OK).json(ApiResponse('Start Transections Get is successfully.', responseData));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const addTransection = AsyncHandler(async (req, res) => {
    const { type, user_id, credit, transectionstate, cp_id, connecter_id, id_tag, transection_pk, connecter_pk } =
        req.body;

    let options = {
        type: type,
        user_id: user_id,
        credit: credit,
        transectionstate: transectionstate,
        cp_id: cp_id,
        connecter_id: connecter_id,
        id_tag: id_tag,
        transection_pk: transection_pk,
        connecter_pk: connecter_pk,
    };

    try {
        const addTransection = await SteveData.insertTransection(options);

        if (!addTransection) throw new ApiError('Internal Server Error! Server failed insert treansection.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('insert treansection successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getActiveChecgerData = AsyncHandler(async (req, res) => {
    const { transaction_pk } = req.body;

    let options = {
        transaction_pk: transaction_pk,
        // measurand: measurand
    };

    try {
        const getActiveChecgerData = await SteveData.getActiveChecgerData(options);

        if (!getActiveChecgerData) throw new ApiError('Internal Server Error! Server failed get active data.');

        const responseData = getActiveChecgerData;

        res.status(StatusCodes.OK).json(ApiResponse('get active data successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getActiveTransections = AsyncHandler(async (req, res) => {
    const { user_id } = req.body;

    let options = {
        user_id: user_id,
        // measurand: measurand
    };

    try {
        const getActiveTransections = await SteveData.getActiveTransections(options);

        if (!getActiveTransections) throw new ApiError('Internal Server Error! Server failed get active data.');

        const responseData = getActiveTransections;

        res.status(StatusCodes.OK).json(ApiResponse('get active data successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getTransectionsFinish = AsyncHandler(async (req, res) => {
    const { transactionId, state } = req.body;

    let options = {
        transection_pk: transactionId,
    };

    try {
        const getTransectionsFinish = await SteveData.getTransectionsFinish(options);

        if (!getTransectionsFinish) throw new ApiError('Internal Server Error! Server failed get active data.');

        const responseData = getTransectionsFinish;

        res.status(StatusCodes.OK).json(ApiResponse('get active data successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getConnectorFinish = AsyncHandler(async (req, res) => {
    const { connector_pk } = req.body;

    let options = {
        connector_pk: connector_pk,
    };

    try {
        const getConnectorFinish = await SteveData.getConnectorFinish(options);

        if (!getConnectorFinish) throw new ApiError('Internal Server Error! Server failed get connector data.');

        const responseData = getConnectorFinish;

        res.status(StatusCodes.OK).json(
            ApiResponse('get connector status successfully.', responseData, StatusCodes.OK)
        );
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const getActivePriceKw = AsyncHandler(async (req, res) => {
    try {
        const getActivePriceKw = await SteveData.getActivePriceKw();

        if (!getActivePriceKw) throw new ApiError('Internal Server Error! Server failed get connector data.');

        const responseData = getActivePriceKw;

        res.status(StatusCodes.OK).json(
            ApiResponse('get connector status successfully.', responseData, StatusCodes.OK)
        );
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const addnewPriceKw = AsyncHandler(async (req, res) => {
    const { price_Kw, monetary_unit } = req.body;

    let options = {
        price_Kw: price_Kw,
        monetary_unit: monetary_unit,
    };

    try {
        const addnewPriceKw = await SteveData.insertPriceKw(options);

        if (!addnewPriceKw) throw new ApiError('Internal Server Error! Server failed price.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('insert price successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const updatePriceKw = AsyncHandler(async (req, res) => {
    const { id_price, price_Kw, monetary_unit } = req.body;

    let options = {
        id_price: id_price,
        price_Kw: price_Kw,
        monetary_unit: monetary_unit,
    };

    try {
        const updatePriceKw = await SteveData.updatePriceKw(options);

        if (!updatePriceKw) throw new ApiError('Internal Server Error! Server failed update price.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('update price successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

const summaryChargerUser = AsyncHandler(async (req, res) => {
    const {
        user_id,
        sum_price,
        sum_Kw,
        credit,
        cp_id,
        connecter_id,
        id_tag,
        transection_pk,
        connecter_pk,
        country,
        sum_min,
    } = req.body;

    let options = {
        user_id: user_id,
        sum_price: sum_price,
        sum_Kw: sum_Kw,
        credit: credit,
        cp_id: cp_id,
        connecter_id: connecter_id,
        id_tag: id_tag,
        transection_pk: transection_pk,
        connecter_pk: connecter_pk,
        country: country,
        sum_min: sum_min,
    };

    try {
        const summaryChargerUser = await SteveData.summaryChargerUser(options);

        if (!summaryChargerUser) throw new ApiError('Internal Server Error! Server failed insert treansection.');

        const responseData = {};

        res.status(StatusCodes.OK).json(ApiResponse('insert treansection successfully.', responseData, StatusCodes.OK));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse('Internal Server Error'));
    }
});

module.exports = {
    getStation,
    getConnecter,
    getConnecterStatus,
    getStartTransectionLast,
    addTransection,
    getActiveChecgerData,
    getActiveTransections,
    getTransectionsFinish,
    getConnectorFinish,
    getActivePriceKw,
    addnewPriceKw,
    updatePriceKw,
    summaryChargerUser,
};
