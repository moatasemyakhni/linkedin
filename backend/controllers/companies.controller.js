const Company = require('../models/Company');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
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
    } = req.body;

    try {
        //check email at user if exists
        const checkEmail = await User.findOne({email: email});
        if(checkEmail) {
            throw {message: 'email is taken'};
        }
        if(!password) {
            throw {message: 'All fields are required'}
        }
        if(password.length < 6) {
            throw {message: 'password should be at least 6 chars'};
        }
        const company = new Company();
        company.name = name;
        company.email = email;
        company.password = await bcrypt.hash(password, 10);
        company.website = website;
        company.industry = industry;
        company.organizationSize = organizationSize;
        company.type = type;

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

const companyInfo = async (req, res) => {
    const token = req.body.token;
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const company = await Company.findOne({email: decoded.email}).lean();
        if(company) {
            return res.json({...company, company: true});
        }else {
            res.json({company: false});
        }
         
    }catch(err){
        res.json({company: false});
    }
}


const updateLogo = async (req, res) => {
    const company_id = req.body._id;
    //in base64
    const newLogo = req.body.logo;
    try {
        const company = await Company.findById(company_id);
        company.logo = 
        base64ToImageWithPath(company_id, company.name, newLogo);
        company.save();
        res.send(company);
    }catch(err) {
        res.status(400).json({
            message: err.message,
        });
    }
}


const base64ToImageWithPath = (company_id, name, base64) => {
    const extension = base64.split(';')[0].split('/')[1];

    const base64Image = base64.replace(/^data:image\/png;base64,/, "");
    const imgName = `${name}_${Date.now()}.${extension}`;
    const path = `${process.env.COMPANY_IMAGE_PATH}/${company_id}`;
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    // store image in server
    const completePath = `${process.env.COMPANY_IMAGE_LOCAL_PATH}/${company_id}/${imgName}`;
    // store image in actual path
    const completePath2 = `${process.env.COMPANY_IMAGE_PATH}/${company_id}/${imgName}`;
    fs.writeFile(completePath2, base64Image, 'base64', (err) => {
        if(err) throw err;
    });
    return completePath;
}

module.exports = {
    login,
    signup,
    companyInfo,
    updateLogo,
}