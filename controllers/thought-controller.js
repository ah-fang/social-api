const Thought = require('../models/Thought');
const User = require('../models/User');

//CRUD operations for Thought document
const ThoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id' })
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  },

  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id }},
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new:true, runValidators: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUserData);
      })
    .catch(err => res.status(400).json(err));
  },

  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: _id }},
        { new: true }
      );
    })
    .then(deletedThought => {
      if(!deletedThought) {
        return res.status(404).json({ message: 'No thought found with this id' })
      }
      res.json("Successfully deleted");
    })
    .catch(err => res.json(err));
  },

  // push a Reaction to the Thought's 'reactions' array
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // pull a Reaction from the Thought's 'reactions' array 
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(deletedReaction => {
        if(!deletedReaction) {
          return res.status(404).json({ message: 'No reaction found!' })
        }
        res.json(deletedReaction);
      })
      .catch(err => res.json(err));
  }
};

module.exports = ThoughtController;
