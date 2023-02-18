const mongoose = require("mongoose")
const dotenv = require('dotenv')

dotenv.config({
    path: ".env"
})
const {URL} = process.env

mongoose.connect(URL)
.then(()=> console.log("The Server Succeded To Connection With db"))
.catch((err)=>console.log(`The Server Failed To Connection With db`))

// mongoose.set('strictQuery', false);