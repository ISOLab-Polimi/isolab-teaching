'use strict';

var utils = require('../utils/writer.js');
var BasicSuppliersService = require('../services/BasicSuppliersService');

module.exports.newWeddingBS = function newWeddingBS(req, res) {
    BasicSuppliersService.saveNewWedding(req.body.date)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.cancelWeddingBS = function cancelWeddingBS(req, res) {
    BasicSuppliersService.cancelWedding(req.body.weddingID)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.weddingLocationImages = function weddingLocationImages(req, res) {
    BasicSuppliersService.getLocationURL(req.body.weddingID)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};