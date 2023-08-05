const router = require('express').Router();

const {
    retrieveUsers,
    retrieveSingleUser,
    addNewUser,
    alterUser,
    removeUser,
    appendFriend,
    detachFriend
} = require('../../controllers/user-controller');

// Set up routes

// For /api/users 
router.route('/')
    .get(retrieveUsers)
    .post(addNewUser);

// For /api/users/:userId
router.route('/:userId')
    .get(retrieveSingleUser)
    .put(alterUser)
    .delete(removeUser);

// For /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(appendFriend)
    .delete(detachFriend);

module.exports = router;