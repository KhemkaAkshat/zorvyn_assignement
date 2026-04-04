const jwt = require("jsonwebtoken")
const protect = (req, res, next)=>{
    try {
        let token
        if(req.headers.authorization) token = req.headers.authorization;
        if(!token) return res.status(401).json({message:"Unauthorized, no token"})
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next();

    } catch (error) {
        console.log(error)

        return res.status(401).json({message:"Unauthorized, invalid token"})
    }
}


const authorize = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"Forbidden: Access denied"})
        }
        next()
    }
}

module.exports = { protect, authorize }