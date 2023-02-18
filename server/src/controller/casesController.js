const casesModel = require("../models/casesModel")
const ApiError = require("../utilities/ApiError")

//add cases
const addNewCase = async(req, res, next)=>{
    const {
        caseNumber,
        clientName,
        opponent,
        caseType,
        fromSession,
        toSession,
        decision,
        user
    } = req.body
    try{
        const newCase = await casesModel.create({
            caseNumber,
            clientName,
            opponent,
            caseType,
            fromSession,
            toSession,
            decision,
            user
        })
        res.status(201).json(newCase)
    }catch(err){
        next(new ApiError(`Sorry add new Cases ${err}`))
    }
}
//update cases
const updateCase = async(req, res, next)=>{
    const {id} = req.params
    const {
        caseNumber,
        clientName,
        opponent,
        caseType,
        fromSession,
        toSession,
        decision
    } = req.body
    try{
        const caseUpdated = await casesModel.findByIdAndUpdate(
            id,
            {caseNumber,
            clientName,
            opponent,
            caseType,
            fromSession,
            toSession,
            decision},
            {new: true})
        res.status(201).json(caseUpdated)
    }catch(err){
        next(new ApiError(`Sorry update Case ${err}`))
    }
}
//delete case
const deleteCase = async(req, res, next)=>{
    const {id} = req.params
    try{
        const caseDeleted = await casesModel.findByIdAndDelete(id)
        res.status(202).json(caseDeleted)
    }catch(err){
        next(new ApiError(`Sorry delete case ${err}`))
    }
}
//Get Cases Which Specific The User
const getCases = async(req, res, next)=>{
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 10;
    // const skip = (page - 1) * limit
    let filterUser = {}
    if(req.params.id){
        filterUser = {user: req.params.id}
    }
    try{
        const allCases = await casesModel.find(filterUser).populate({path: "user", select: "email"})
        res.status(201).json({results: allCases.length, data: allCases})
    }catch(err){
        next(new ApiError(`Sorry get all Cases ${err}`))
    }
}

module.exports = {
    addNewCase,
    updateCase,
    deleteCase,
    getCases
}