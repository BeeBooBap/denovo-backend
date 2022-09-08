const Case = require('../models/caseModel')
const mongoose = require('mongoose')

// get all cases
const getCases = async (req, res) => {
    const cases = await Case.find({}).sort({createdAt: -1})
    res.status(200).json(cases)
}

// get a single case 
const getCase = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such case'})
    }

    const matter = await Case.findById(id)

    if (!matter) {
        return res.status(404).json({error: 'No such case'})
    }

    res.status(200).json(matter)
}

// create a new case
const createCase = async (req, res) => {
    const {uniqueID, caseName, partyFirstName, partySecondName,
        opposingPartyFirstName, opposingPartySecondName, issue,
        caseOrigin, dateDecision, term, respondent, partyWinning} = req.body

    let emptyFields = []

    if (!uniqueID) {
        emptyFields.push('uniqueId')
    }

    if (!caseName) {
        emptyFields.push('caseName')
    }
    if (!partyFirstName) {
        emptyFields.push('partyFirstName')
    }
    if (!partySecondName) {
        emptyFields.push('partySecondName')
    }
    if (!issue) {
        emptyFields.push('issue')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: 'Please fill in the required fields', emptyFields
        })
    }

    // add doc to db
    try {
        const matter = await Case.create({
            uniqueID, caseName, partyFirstName, partySecondName,
            opposingPartyFirstName, opposingPartySecondName, issue,
            caseOrigin, dateDecision, term, respondent, partyWinning
        })
        res.status(200).json(matter)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a case
const deleteCase = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such case'})
    }

    const matter = await Case.findOneAndDelete({_id: id})

    if (!matter) {
        return res.status(404).json({error: 'No such case'})
    }

    res.status(200).json(matter)
}

// update a case
const updateCase = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such case'})
    }

    const matter = await Case.findOneAndUpdate(
        {_id: id}, {...req.body})

    if (!matter) {
        return res.status(404).json({error: 'No such case'})
    }
    
    res.status(200).json(matter)
}

module.exports = {
    getCases,
    getCase,
    createCase,
    deleteCase,
    updateCase
}