//auth.js+user.js
const User = require('../models/user')
const signup =async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }catch(err){
        return res.status(400).json({
            error: err
        })
    }
}  

const signin =async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(401).json({ error: "Invalid credentials" })
    }
}

const signout =async (req, res) => {
    try {
        req.user.token = null
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).json({e})
    }
}

const userById = async (req,res,next,id) => {
    try{
        console.log("userByid")
        const user = await User.findById(id)
        if(!user){
            throw new Error("user not found")
        }
        req.profile=user
        next()
    }catch(e){
        return res.status(400).json({
            error:e
        })
    }
}
const read = (req,res) =>{
    res.json(req.profile)
}

const update = async (req, res) => {
    const updates = Object.keys(req.body)

    const allowedUpdates = ['name', 'email', 'password', 'role']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.profile[update] = req.body[update])
        await req.profile.save()
        res.send(req.profile)
    } catch (e) {
        res.status(400).send(e)
    }
}


module.exports = {
    signup,signin,signout,userById,read,update
}