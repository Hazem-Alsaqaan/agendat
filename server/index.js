const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const db = require("./db")
const ApiError = require("./src/utilities/ApiError")
const userRouter = require("./src/route/userRouter")

const app = express()

app.use(bodyParser.urlencoded({limit: "50mb", extended: true}))
app.use(bodyParser.json({limit: "50mb"}))
app.use(express.json())
app.use(cors())

app.use(helmet())

app.use("/api/v1/users", userRouter)
app.all("*", (req, res, next)=>{
    next(new ApiError(`This Route Is Not Correct ${req.originalUrl}`, 404))
})
app.use((err, req, res, next)=>{
    res.status(err.statusCode).json({
        message: err.message,
        stack: err.stack
    })
})

dotenv.config({
    path: ".env"
})
const {PORT} = process.env

app.listen(process.env.PORT || 4000, ()=>console.log("Server Is running........"))