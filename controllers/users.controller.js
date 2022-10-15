const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            expiresIn: '10h',
        }
    );

    return token;
}

const login = async (req, res) => {
     
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');
    res.status(404).json({message: user});
    if(!user) return res.status(404).json({message: 'Invalid Credentials'});

    const checkPassword = bcrypt.compare(password, user.password);
    if(!checkPassword) return res.status(404).json({message: 'Invalid Credentials'});

    res.status(400).json(createToken(user));
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
        res.status(200).json(user);
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

module.exports = {
    login,
    signup,
    getAllUsers
}