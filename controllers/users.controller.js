const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user_type = 'user';

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');

    if(!user) return res.status(404).json({message: 'Invalid Credentials'});

    const checkPassword = bcrypt.compare(password, user.password);
    if(!checkPassword) return res.status(404).json({message: 'Invalid Credentials'});

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

    res.status(400).json(token);

}