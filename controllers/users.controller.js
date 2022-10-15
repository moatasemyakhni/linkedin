const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
const user_type = 'user';

const createToken = (user) => {
    const token = jwt.sign({
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
        profile: user.profile,
        headline: user.headline,
        country: user.country,
        city: user.city,
        phone: user.phone,
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
        const user = await User.findOne({email}).select('+password');
        if(!user) return res.status(404).json({message: 'Invalid Credentials'});
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) return res.status(404).json({message: 'Invalid Credentials'});
    
        res.json({token: createToken(user)});
    }catch (err) {
        res.status(404).json({message: 'Invalid Credentials'});
    }
}

const signup = async(req, res) => {
    const {
        first_name,
        last_name,
        email,
        password,
        profile,
        headline,
        country,
        city,
        phone,
    } = req.body;

    try {
        const user = new User();
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.profile = profile;
        user.headline = headline;
        user.country = country;
        user.city = city;
        user.phone = phone;

        await user.save();
        res.status(200).json({
            user: user, 
            token: createToken(user)
        });
    } catch(err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const getAllUsers = async (req, res) => {
    const allUsers = await User.find();
    res.send(allUsers);
}

const updateProfilePicture = async (req, res) => {
    const user_id = req.body._id;
    //in base64
    const newProfile = req.body.profile;
    try {
        const user = await User.findById(user_id);
        user.profile = base64ToImageWithPath(user_id, user.first_name, user.last_name, newProfile);
        user.save();
        res.send(user);
    }catch(err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const followCompany = async (req, res) => {
    const user_id = req.body._id;
    const company_id = req.body.company_id;
    try {
        const user = await User.findById(user_id);
        user.follow_company.push(company_id);
        await user.save();
        res.send(user);
    }catch(err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const unFollowCompany = async (req, res) => {
    const user_id = req.body._id;
    const company_id = req.body.company_id;
    try {
        const user = await User.findById(user_id);
        user.follow_company.splice(user.follow_company.indexOf(company_id), 1);
        await user.save();
        res.send(user);
    }catch(err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const base64ToImageWithPath = (user_id, firstName, lastName, base64) => {
    const extension = base64.split(';')[0].split('/')[1];
    const base64Image = base64.replace(/^data:image\/png;base64,/, "");
    const imgName = `${firstName}_${lastName}_${Date.now()}.${extension}`;
    const path = `${process.env.IMAGE_LOCAL_PATH}/${user_id}`;
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    const completePath = `${process.env.IMAGE_LOCAL_PATH}/${user_id}/${imgName}`;
    fs.writeFile(completePath, base64Image, 'base64', (err) => {
        if(err) throw err;
    });
    return completePath;
}

module.exports = {
    login,
    signup,
    getAllUsers,
    updateProfilePicture,
    followCompany,
    unFollowCompany,
}