const mongoose = require('mongoose')

const Schema = mongoose.Schema
const outcomeSchema = new Schema({ name: String })

const caseSchema = new Schema({
    uniqueID: {
        type: String,
        required: true
    },
    caseName: {
        type: String,
        required: true
    },
    partyFirstName: {
        type: String,
        required: true
    },
    partySecondName: {
        type: String,
        required: true
    },
    opposingPartyFirstName: {
        type: String,
        required: false
    },
    opposingPartySecondName: {
        type: String,
        required: false
    },
    dateDecision: {
        type: String,
        required: false
    },
    term: {
        type: Number,
        required: false
    },
    respondent: {
        type: Number,
        required: false
    },
    caseOrigin: {
        type: Number,
        required: false
    },
    issue: {
        type: Number,
        required: false
    },
    partyWinning: {
        type: []
    }
}, { timestamps: true })

module.exports = mongoose.model('Case', caseSchema)