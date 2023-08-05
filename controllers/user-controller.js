const { User, Thought } = require('../models');

module.exports = {

    // FETCH all users
    async retrieveUsers(req, res) {
        try {
            const allUsers = await User.find();
            res.json(allUsers);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // FETCH a single user by its _id and populated thought and friend data
    async retrieveSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if (!singleUser) {
                return res.status(404).json({ message: 'User with this ID does not exist'})
            }

            res.json(singleUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // CREATE a new user
    async addNewUser(req, res) {
        try{
            const newUser = await User.create(req.body);
            
            res.json(newUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // UPDATE a user by its _id
    async alterUser(req, res) {
        try{
            const changedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!changedUser) {
                res.status(404).json({ message: 'No User exists with this id!' });
            }

            res.json(changedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE to remove user by its _id
    async removeUser(req, res) {
        try {
            const deletedUser = await User.findOneAndRemove({ _id: req.params.userId });
    
            if (!deletedUser) {
            res.status(404).json({ message: 'User does not exist' });
            }

            const thoughtArray = deletedUser.thoughts
            const removedThoughts = await Thought.deleteMany(
                { _id: { $in: thoughtArray }},
            );
    
            res.json({ message: 'User removed!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // ADD a new friend to a user's friend list
    async appendFriend(req, res) {
        try {
            const friendAdded = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                {  new: true} 
            );

            if (!friendAdded) {
                return res.status(404).json({ message: 'User not found'});
            }

            res.json(friendAdded);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE to remove a friend from a user's friend list
    async detachFriend(req, res) {
        try {
            const friendRemoved = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                {  new: true}
            );

            if (!friendRemoved) {
                return res.status(404).json({ message: "User not found"});
            }

            res.json(friendRemoved);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
