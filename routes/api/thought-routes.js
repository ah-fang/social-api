const router = require('express').Router();
const { 
    addThought, 
    addReaction,
    removeThought,
    removeReaction 
} = require('../../controllers/thought-controller');

// api/thoughts/:userId
router.route('/:UserId').post(addThought);

// api/thoughts/userId/thoughtId
router
.route('/:userId/:ThoughtId')
.put(addReaction)
.delete(removeThought);

router.route('./:userId/:ThoughtId/:reactionId').delete(removeReaction);

module.exports = router;