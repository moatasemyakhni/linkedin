const mongoose = require('mongoose');


const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Company name is required',
        min: 3,
    },
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true,
        unique: true,
        trim: true,
    },
    website: String,
    industry: {
        type: String,
        required: 'Industry is required',
    },
    organizationSize: {
        type: Number,
        required: 'Number of employees is required',
    },
    type: {
        type: String,
        required: 'Type is required',
        enum: ['public company', 'self-employed', 'government agency', 'non profit', 'privately held', 'partnership', 'sole proprietorship'],
    },
    logo: {
        type: String,
        default: process.env.DEFAULT_IMAGE_PATH,
    },
    tagline: {
        type: String,
        required: 'Tagline is required',
        default: 'tagline',
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