const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})
userSchema
.virtual('friendCount')
.get(function () {
    return this.friends.length
})

const User = model('user', userSchema);
module.exports = User;