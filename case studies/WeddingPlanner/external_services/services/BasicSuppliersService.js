const locationImageURL = "https://www.romeoandjuliet-weddings.com/images/weddings-in-italy/top-wedding-venues/la-cervara-luxury-wedding-venue-italy.jpg"
const res = {
    imagesURL: locationImageURL
}

exports.saveNewWedding = function (weddingDate) {
    return new Promise(function (resolve, reject) {
        resolve();
    }).catch(e => {
        console.error(e);
    });
};

exports.cancelWedding = function (weddingID) {
    return new Promise(function (resolve, reject) {
        resolve();
    }).catch(e => {
        console.error(e);
    });
};

exports.getLocationURL = function (weddingID) {
    return new Promise(function (resolve, reject) {
        resolve(JSON.stringify(res));
    }).catch(e => {
        console.error(e);
    });
};