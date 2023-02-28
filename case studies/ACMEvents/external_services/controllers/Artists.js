'use strict';

var utils = require('../utils/writer.js');
var ArtistsService = require('../services/ArtistsService');

module.exports.newEventRequest = function newEventRequest(req, res) {
    ArtistsService.evaluateNewEventRequest(req.body.artistName ,req.body.date, req.body.time)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.noAvailableTimeslot = function noAvailableTimeslot(req, res) {
    ArtistsService.informNoAvailableTimeslot(req.body.artistName, req.body.eventID, req.body.date)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.newTimeSlot = function newTimeSlot(req, res) {
    ArtistsService.provideNewTimeslot(req.body.artistName, req.body.eventID, req.body.date, req.body.time)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};