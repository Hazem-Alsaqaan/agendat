const userRouter = require("express").Router()
const casesRouter = require("./casesRouter")
const {
    registerUser,
    loginUser,
    getUsers,
    deleteUser,
    updateUser,
    getOneUsers
} = require("../controller/userController")


userRouter.post("/register", registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/", getUsers)
userRouter.get("/:id", getOneUsers)
userRouter.delete("/:id", deleteUser)
userRouter.put("/:id", updateUser)
//Nested Router Which Specific Cases Route
userRouter.use("/:id/cases", casesRouter)

module.exports = userRouter
