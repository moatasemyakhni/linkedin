const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuthMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) return res.status(401).json({message: "Unauthorized"});
    try{
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
        const user = await User.findOne({email: decoded.email}).lean()
        next()

    }catch(err){
        return res.status(401).json({message: "Unauthorized"});
    }

}


module.exports = userAuthMiddleware;