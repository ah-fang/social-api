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

// api/thoughts/userId/thoughtId
router
.route('/:userId/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.put(addReaction)
.delete(removeThought);

router.route('./:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;