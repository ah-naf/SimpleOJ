const mongoose = require('mongoose')

const ProblemSchema = new mongoose.Schema({
    slug: {
        type: String
    }
}, {timestamps: true})