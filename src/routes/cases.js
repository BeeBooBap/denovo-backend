const express = require('express')
const cors = require('cors')
const {
    getCases,
    getCase,
    createCase,
    deleteCase,
    updateCase
} = require('../controllers/caseController')

const router = express.Router()

// GET all cases
router.get('/', getCases)

// GET a single case
router.get('/:id', getCase)

// POST a new case
router.post('/', createCase)

// DELETE a new case
router.delete('/:id', deleteCase)

// UPDATE a new case
router.patch('/:id', updateCase, cors())

module.exports = router