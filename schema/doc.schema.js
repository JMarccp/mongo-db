const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocSchema = new Schema({
    docTitle: {
        type: String,
        required: true
    },
    docBody: {
        type: String,
        required: true
    },
    docNumber:{
        type: Number
    },
    docDate: {
        type: Date,
        required: true,
        default: Date.now
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Doc', DocSchema);