const { Schema, Types, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
       type: Date,
       default: Date.now,
       get: (created) => dateFormat(created),
    },
    userName:{
    type: String,
    required: true,
    },
    reactions: [reactionSchema]
})
thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema);
module.exports = Thought;