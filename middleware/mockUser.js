const mockUser = (req, res, next)=>{
    req.user = {
        role:"admin",
    }
    next();
}

module.exports = mockUser;