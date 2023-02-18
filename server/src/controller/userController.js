const ApiError = require("../utilities/ApiError")
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//register
const registerUser = async (req, res, next)=>{
    let {userName, email, password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(user){
            res.status(409).send("this email is already found please change it and try again")
        }else{
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            password = await bcrypt.hash(password, salt)
            const newUser = await userModel.create({userName, email, password})
            // const generateToken = jwt.sign(newUser._id, "tokenSecretKey")
            res.status(201).json(newUser)
        }
    }catch(err){
        next(new ApiError(`Sorry To Add This User${err}`, 406))
    }
}
//login
const loginUser = async (req, res, next)=>{
    const {email, password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(!user){
            res.status(405).json("this user didn't register")
        }else{
            const checkPassword = await bcrypt.compare(password, user.password)
            if(checkPassword){
                // const generateToken = jwt.sign(user._id, "tokenSecretKey")
                return res.status(200).json(user)
            }else{
                res.status(404).json("check email or password")
            }
        }
    }catch(err){
        next (new ApiError(`Sorry Login User ${err}`, 401))
    }
}
//get users
const getUsers = async (req, res, next)=>{
    try{
        const users = await userModel.find()
        if(!users){
            res.status(404).send("users Not Found")
        }else{
            res.status(200).json(users)
        }
    }catch(err){
        next(new ApiError(`Sorry get users ${err}`, 400))
    }
}
//get One users
const getOneUsers = async (req, res, next)=>{
    const {id} = req.params
    try{
        const user = await userModel.findById(id)
        if(!user){
            res.status(404).send("user Not Found")
        }else{
            res.status(200).json(user)
        }
    }catch(err){
        next(new ApiError(`Sorry get this user ${err}`, 400))
    }
}

//delete user
const deleteUser = async(req, res, next)=>{
    const {id} = req.params
    try{
        const user = await userModel.findByIdAndDelete(id)
        res.status(202).json(user)
    }catch(err){
        next (new ApiError(`Sorry to delete this user ${err}`, 400))
    }
}
//update user
const updateUser = async(req, res, next)=>{
    const {id} = req.params
    const {userName,password, picture} = req.body
    try{
        const userUpdated = await userModel.findByIdAndUpdate(
                id,
                {userName, password, picture},
                {new: true}
                )
        res.status(201).json(userUpdated)
    }catch(err){
        next(new ApiError(`Sorry To Update ${err}`))
    }
}



module.exports = {
        registerUser,
        loginUser,
        getUsers,
        deleteUser,
        updateUser,
        getOneUsers
    }