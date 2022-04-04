const express = require("express")
const { registerUser, loginUser, logoutUser, getUserDetail, updatePassword, updateProfile, getAllUsers, getSingleUserDetail, updateUser, deleteUser, userLoginWithGmail } = require("../controllers/userController")
const { isAuthenticated, isAdmin } = require("../middlewares/auth")

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/gmail/login').post(userLoginWithGmail)
router.route('/logout').get(isAuthenticated , logoutUser)
router.route('/me').get(isAuthenticated , getUserDetail)
router.route('/update/password').put(isAuthenticated , updatePassword)
router.route('/me/update').put(isAuthenticated , updateProfile)
router.route('/admin/users').get(isAuthenticated , isAdmin , getAllUsers)
router.route('/admin/user/:id').get(isAuthenticated , isAdmin , getSingleUserDetail).put(isAuthenticated , isAdmin , updateUser).delete(isAuthenticated ,isAdmin , deleteUser)

module.exports = router