const { User, Thought } = require('../models');

module.exports = {
    // Get all Users
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single User
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(thought)
        )
            .catch((err) => res.status(500).json(err));
    },
    // Create a user
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                )
                    .then(user => {
                        res.json(thought)
                    })
            }
            )
            .catch((err) => res.status(500).json(err));
    },
    //Delets a user
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                res.json(thought)
            )
    },
    // Update a user
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};