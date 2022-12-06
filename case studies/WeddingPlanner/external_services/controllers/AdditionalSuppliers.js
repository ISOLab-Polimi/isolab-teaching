'use strict';

var utils = require('../utils/writer.js');
var AdditionalSuppliersService = require('../services/AdditionalSuppliersService');

module.exports.newWeddingAS = function newWeddingAS(req, res) {
    AdditionalSuppliersService.saveNewWedding(req.body.date)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.cancelWeddingAS = function cancelWeddingAS(req, res) {
    AdditionalSuppliersService.cancelWedding(req.body.weddingID)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};