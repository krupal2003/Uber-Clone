const express = require('express');
const router = express.Router();
const mapController = require('../controllers/maps.controller')
const authMiddelware = require('../middlewares/auth.middleware')
const { query } = require('express-validator')

router.get('/get-cordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddelware.authUser, mapController.getCordinates
)

router.get(
    '/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddelware.authUser,
    mapController.getDistanceAndtime
)

router.get('/auto-suggetion',mapController.getAutoCompleteSuggetion)


module.exports = router;