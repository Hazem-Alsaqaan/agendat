const casesRouter = require("express").Router({mergeParams: true})
const {
    addNewCase,
    updateCase,
    deleteCase,
    getCases
} = require("../controller/casesController")


casesRouter.post("/", addNewCase)
casesRouter.put("/:id", updateCase)
casesRouter.delete("/:id", deleteCase)
casesRouter.get("/", getCases)

module.exports = casesRouter
