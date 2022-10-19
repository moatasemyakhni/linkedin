const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

const companyAuthMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) return res.status(401).json({message: "Unauthorized"});
    try{
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
        const company = await Company.findOne({email: decoded.email}).lean();
        next()

    }catch(err){
        return res.status(401).json({message: "Unauthorized"});
    }

}


module.exports = companyAuthMiddleware;