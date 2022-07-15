const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
  } = require('../../controllers/user-controller');

// /api/users routes
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id routes
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:userId/friends').put(addFriend);

router.route('/:userId/friends/:friendId').put(removeFriend);

module.exports = router;