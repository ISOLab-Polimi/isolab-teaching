let artistsDB = require('../utils/ArtistsDB.js');

exports.evaluateNewEventRequest = function (artistName, eventDate, timeslot) {
    return new Promise(function (resolve, reject) {
        available = artistsDB.isAvailable(artistName)
        newTS = artistsDB.isNewTimeslot(artistName)
        if (available && !newTS){
            resolve({ "availability": true, "newTimeslot": false });
        } else if (available && newTS) {
            resolve({ "availability": true, "newTimeslot": true });
        } else if (!available && newTS) {
            resolve({ "availability": false, "newTimeslot": true });
        } else if (!available && !newTS) {
            resolve({ "availability": false, "newTimeslot": false });
        }
    }).catch(e => {
        console.error(e);
    });
};

exports.informNoAvailableTimeslot = function (artistName, eventID, eventDate) {
    return new Promise(function (resolve, reject) {
        resolve();
    }).catch(e => {
        console.error(e);
    });
};

exports.provideNewTimeslot = function (artistName, eventDate, newTimeslot) {
    return new Promise(function (resolve, reject) {
        resolve(JSON.stringify(res));
    }).catch(e => {
        console.error(e);
    });
};