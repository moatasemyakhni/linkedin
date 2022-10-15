const User = require('../models/User');
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
