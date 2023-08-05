const { User, Thought } = require('../models');

module.exports = {
    // fetch all thoughts
    async fetchAllThoughts(req, res) {
        try {
            const allThoughts = await Thought.find();
            res.json(allThoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // fetch single thought by id
    async fetchThoughtById(req, res) {
        try {
            const thoughtItem = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if (!thoughtItem) {
                return res.status(404).json({ message: 'No Thought associated with this ID'})
            }

            res.json(thoughtItem);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // generate a new thought and add id to user's thoughts collection
    async generateThought(req, res) {
        try{
            const newThought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId},
                { $push: {thoughts: newThought._id }}
            )
            res.json(newThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // modify a thought by its id
    async modifyThought(req, res) {
        try{
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedThought) {
                res.status(404).json({ message: 'No Thought associated with this id!' });
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // remove thought by id
    async removeThought(req, res) {
        try {
            const removedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
            if (!removedThought) {
            res.status(404).json({ message: 'No thought exists' });
            }

            await User.findOneAndUpdate(
                { username: removedThought.username},
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            );
    
            res.json({ message: 'Thought removed!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add a reaction stored in a thoughts reactions collection
    async appendReaction(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true} 
            );

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found'});
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // eliminate a reaction by reaction id
    async eliminateReaction(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {reactions: {reactionId: req.params.reactionId}}},
                { runValidators: true, new: true}
            );

            if (!updatedThought) {
                return res.status(404).json({ message: "No thought found"});
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
