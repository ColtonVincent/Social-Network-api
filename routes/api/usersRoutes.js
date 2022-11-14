const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend,
} = require('../../controllers/user-controller.js');

router.route('/').get(getUsers).post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
    

router.route('/:userId/friends/:friendsId').post(createFriend).delete(deleteFriend)
module.exports = router;
