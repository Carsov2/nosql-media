const router = require('express').Router();

const {

    fetchAllThoughts,
    fetchThoughtById,
    generateThought,
    modifyThought,
    removeThought,
    appendReaction,
    eliminateReaction,

} = require('../../controllers/thought-controller');

// api/thoughts routes

router.route('/').get(fetchAllThoughts).post(generateThought);

// thought id routes
router.route('/:thoughtId').get(fetchThoughtById).put(modifyThought).delete(removeThought);


// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/').post(appendReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(eliminateReaction);



module.exports = router;