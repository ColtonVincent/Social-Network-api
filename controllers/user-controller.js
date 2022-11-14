const User = require('../models/User');

module.exports = {
    // Get all Users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Get a single User
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        then((user) => 
            !user
                ?res.status(404).json({ message: 'No user with that ID'})
                : res.json(user)       
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    //Deletes a user
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) =>
        res.json(user)
        )
    },
    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with this ID'})
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // creates a friend
    createFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $addToSet: {friends: req.params.friendId}},
            { runValidators: true, new: true}
        )
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with this ID'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // deletes a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $pull: {friends: req.params.friendId}},
            { runValidators: true, new: true}
        )
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with this ID'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};