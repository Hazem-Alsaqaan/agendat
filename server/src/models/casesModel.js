const mongoose = require("mongoose")

const casesSchema = new mongoose.Schema({
    caseNumber:{
        type: String,
        trim: true
    },
    clientName: {
        type: String,
        trim: true
    },
    opponent: {
        type: String,
        trim: true
    },
    caseType: {
        type: String,
        trim: true
    },
    fromSession: {
        type: String,
        trim: true
    },
    toSession: {
        type: String,
        trim: true
    },
    decision: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},{timestamps: true})

const casesModel = mongoose.model("cases", casesSchema)
module.exports = casesModel