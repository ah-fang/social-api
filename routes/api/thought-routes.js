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

// localhost:3001/api/thoughts...

router.route('/')
.get(getAllThoughts)
.post(createThought);

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;