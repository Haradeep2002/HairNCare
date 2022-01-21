//use in combination with auth.js
//currently authenticated user
const isAuth = (req,res,next) => {
    // console.log(req.profile)
    // console.log(req.user)
    // console.log(req.profile._id==req.user._id)
    let user = req.profile && req.user &&  req.profile._id.equals(req.user._id);
    if(!user){
        return res.status(403).json({
            error:"Access denied"
        })
    }
    next()
}

module.exports = isAuth