const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definition collection and schema for Service
let Service = new Schema({
    ServiceName: {
        type: String
    },
    Description: {
        type: String
    },
    RateInUSD: {
        type: String
    }
}, {
    collection: 'Services'
});
module.exports = mongoose.model('Service', Service);