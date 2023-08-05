const router = require('express').Router();

const {

    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,

} = require('../../controllers/thought-controller');

// api/thoughts routes

router.route('/').get(getThoughts).post(createThought);

// thought id routes
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);


// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);



module.exports = router;