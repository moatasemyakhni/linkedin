const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'First name is required',
        min: 3,
    },
    last_name: {
        type: String,
        required: 'Last name is required',
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
        min: 6,
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
    },
    created_at: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updated_at: {
        type: Date,
        default: () => Date.now(),
    },
});

userSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

userSchema.path('email').validate(function(value) {
    const exp = /^(\w([\.-]?\w)*)+@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return value.match(exp);
}, 'Wrong email format');

const User = mongoose.model('User', userSchema);
module.exports = User;