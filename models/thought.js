const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

const ReactionSchema = new Schema(
    {
        
        reactionId: {
            type: Schema.Types.ObjectId,
            // Default value is set to a new ObjectId
            default: () => new Types.ObjectId(),
        },

        // reaction body string, required, 280 character max
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        
        // username string, required
        username: {
            type: String,
            required: true,
        },

        // createdAt date, set to now, get formatted date
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);



const ThoughtSchema = new Schema(
    {
        // thought text string, required, between 1-280
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },

        // createdAt date, set to now, get formatted date
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },

        // username string required
        username: {
            type: String,
            required: true,
        },

        // Array of nested documents created with the reactionSchema
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
)

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
const Thought = model('thought', ThoughtSchema);

module.exports = Thought;