const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user_type = 'company';

const createToken = (company) => {
    const token = jwt.sign({
        email: company.email,
        name: `${company.first_name} ${company.last_name}`,
        profile: company.profile,
        headline: company.headline,
        country: company.country,
        city: company.city,
        phone: company.phone,
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

