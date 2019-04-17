const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definition collection and schema for User Details
let UserDetail = new Schema({
    Name: {
        type: String
    },
    EmailId: {
        type: String
    },
    AccompanyingMembers: {
        type: Number
    },
    OptServices: {
        type: String
    }
}, {
    collection: 'UserDetails'
});
module.exports = mongoose.model('UserDetail', UserDetail);