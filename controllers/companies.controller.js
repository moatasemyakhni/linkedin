const Company = require('../models/Company');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user_type = 'company';

const createToken = (company) => {
    const token = jwt.sign({
        name: company.name,
        email: company.email,
        website: company.website,
        industry: company.industry,
        organizationSize: company.organizationSize,
        type: company.type,
        logo: company.logo,
        tagline: company.tagline,
        user_type: user_type,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.TOKEN_EXPIRE_TIME,
        }
    );

    return token;
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const company = await Company.findOne({email}).select('+password');
        if(!company) return res.status(404).json({message: 'Invalid Credentials'});
        const checkPassword = await bcrypt.compare(password, company.password);
        if(!checkPassword) return res.status(404).json({message: 'Invalid Credentials'});
    
        res.json({token: createToken(company)});
    }catch (err) {
        res.status(404).json({message: 'Invalid Credentials'});
    }
}

const signup = async(req, res) => {
    const {
        name,
        email,
        password,
        website,
        industry,
        organizationSize,
        type,
        logo,
        tagline,
    } = req.body;

    try {
        //check email at user if exists
        const checkEmail = await User.findOne({email: email});
        if(checkEmail) {
            throw {message: 'email is taken'};
        }
        const company = new Company();
        company.name = name;
        company.email = email;
        company.password = await bcrypt.hash(password, 10);
        company.website = website;
        company.industry = industry;
        company.organizationSize = organizationSize;
        company.type = type;
        company.logo = logo;
        company.tagline = tagline;

        await company.save();
        res.status(200).json({
            company: company, 
            token: createToken(company)
        });
    } catch(err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

module.exports = {
    login,
    signup
}