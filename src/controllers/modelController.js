const Model = require('../models/modelSchema')
const mongoose = require('mongoose')

// get a model
const getModel = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such model'})
    }

    const matter = await Model.findById(id)

    if (!matter) {
        return res.status(404).json({error: 'No such model'})
    }

    res.status(200).json(matter)
}

// get all models
const getModels = async (req, res) => {
    const models = await Model.find({}).sort({createdAt: -1})

    res.status(200).json(models)
}

module.exports = {
    getModel,
    getModels
}