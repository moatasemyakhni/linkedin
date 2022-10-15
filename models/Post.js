const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    company_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Company',
        required: 'Company id is required',
    },
    content: {
        type: String,
        required: 'Content is required',
    },
    applied_users: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'User',
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

const Post = mongoose.model('Post', postSchema);
module.exports = Post;