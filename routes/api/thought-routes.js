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
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;