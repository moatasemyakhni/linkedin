const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'First name is required',
        capitalize: true,
        min: 3,
    },
    last_name: {
        type: String,
        required: 'Last name is required',
        capitalize: true,
        min: 3
    },
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: 'Password is required',
        select: false,
    },
    profile: {
        type: String,
        default: process.env.DEFAULT_IMAGE_PATH,
    },
    headline: {
        type: String,
        default: '--',
    },
    country: {
        type: String,
        required: 'Country name is required',
    },
    city: {
        type: String,
        required: 'City name is required',
    },
    phone: {
        type: String,
        required: 'Phone number is required',
    },
    follow_company: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Company"
    }
    ,
    created_at: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updated_at: {
        type: Date,
        default: () => Date.now(),
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;