const mapsService = require('../services/maps.services');
const { validationResult } = require('express-validator')

module.exports.getCordinates = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(404).json({ error: error.array() })
    }
    try {

        const { address } = req.query;

        const cordinates = await mapsService.getAddresCordinates(address);
        res.status(200).json(cordinates);
    } catch (err) {
        res.status(404).json({
            message: "cordinates not found ",
            err: err
        })
    }
}

module.exports.getDistanceAndtime = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(404).json({ error: error.array() })
    }
    try {
        const { origin, destination } = req.query;

        const distanceAndTime = await mapsService.getDistanceAndTime(origin, destination);

        res.status(200).json(distanceAndTime)

    } catch (err) {
        res.status(500).json({
            message: "internal server error",
        })
    }
}


module.exports.getAutoCompleteSuggetion = async (req, res, next) => {
    try {
        const {input}=req.query;

        const suggestions=await mapsService.getAutoCompleteSuggetion(input);
        res.status(200).json(suggestions);
    } catch (err) {
        res.status(500).json({
            message: "internal server error",
        })
    }
}