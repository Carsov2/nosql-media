const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        // username string, unique, required, and trimmed
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },

        // email string, required, unique, use regex to match
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}/, "Must be a valid email"]
        },
        // array of id's referencing thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // array of id's referencing the user model
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]

    },
    {
        toJSON: {
            getters: true,
            virtuals: true 
        },
        id: false,
    }
)

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('user', UserSchema);
module.exports = User;