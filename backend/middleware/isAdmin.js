//use in combination with auth.js
const isAdmin = (req,res,next) => {
    if(req.user.role==0){
        return res.status(403).json({
            error:"Only admins are allowed"
        })
    }
    next()
}

module.exports = isAdmin