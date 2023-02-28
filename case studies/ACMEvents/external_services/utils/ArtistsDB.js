"use strict";

let artists = [
    {
        name: 'Artist 1',
        availability: false,
        newTimeslot: false
    },
    {
        name: 'Artist 2',
        availability: true,
        newTimeslot: false
    },
    {
        name: 'Artist 3',
        availability: true,
        newTimeslot: false
    },
    {
        name: 'Artist 4',
        availability: true,
        newTimeslot: true
    },
    {
        name: 'Artist 5',
        availability: true,
        newTimeslot: true
    }
];

function getArtists() {
    return artists;
}

function isAvailable(artistName) {
    let available = false
    artists.forEach((artist, artistIndex) => {
        if (artist.name === artistName) {
            available = artist.availability
        }
    })
    return available;
}

function isNewTimeslot(artistName) {
    let newTS = false
    artists.forEach((artist, artistIndex) => {
        if (artist.name === artistName) {
            newTS = artist.newTimeslot
        }
    })
    return newTS;
}

module.exports.getArtists = getArtists;
module.exports.isAvailable = isAvailable;
module.exports.isNewTimeslot = isNewTimeslot;