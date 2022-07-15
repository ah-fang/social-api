const router = require('express').Router();
const { 
    getAllThoughts,
    getThoughtById,
    createThought, 
    updateThought,
    addReaction,
    removeThought,
    removeReaction 
} = require('../../controllers/thought-controller');

// api/thoughts/:userId
router.route('/')
.get(getAllThoughts)
.post(createThought);

// api/thoughts/thoughtId
router
.route('/:thoughtId')
.put(addReaction)

// api/thoughts/userId/thoughtId
router
.route('/:userId/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

router.route('/:thoughtId/reactions/:reactionId').put(removeReaction);

module.exports = router;