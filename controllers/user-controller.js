const User = require('../models/User');
const Thought = require('../models/Thought');

const UserController = {
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    },

    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    
    updateUser({ params, body }, res) {
        // update Thoughts first? 
        
        User.findOneAndUpdate({ _id: params.id }, body, { new:true, runValidators: true })
        // update all thoughts with the new username 
        // .then(({ _id }) => {
        //     return Thought.updateMany(
        //         //first param:  get all thoughts associated with this user
        //         {}, 
        //         body,
        //         { new: true, runValidators: true }
        //     //   { _id: params.userId },
        //     //   { $pull: {thoughts: _id }},
        //     //   { new: true }
        //     );
        //   })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
            })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        // delete thoughts first, .then User?
        // deleting subdocuments: use $pull
        User.findOneAndDelete({ _id: params.id })
        // delete all associated data
        .then(({ username }) => {
            return Thought.deleteMany({ username: username })
        })
        /////////////////////////////////////
        .then(dbUserData => {
            if(!dbUserData){
                res.status(400).json({ message: 'No user found with this id' });
                return;
            }
            res.json({ message: 'Successfully deleted' });
        })
        .catch(err => res.status(400).json(err));
    },
    
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: { _id: body.friendId } } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { friendId: params.friendId } } },
            { new: true }
          )
            .then(dbUpdatedUser => {
              if(!dbUpdatedUser) {
                return res.status(404).json({ message: 'Not found in friends list!' })
              }
              res.json(dbUpdatedUser);
            })
            .catch(err => res.json(err));
    }
}

module.exports = UserController;