const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Location
let Location = new Schema({
    City: {
        type: String
    },
    State: {
        type: String
    },
    Country: {
        type: String
    }
}, {
    collection: 'Locations'
});
module.exports = mongoose.model('Location', Location);