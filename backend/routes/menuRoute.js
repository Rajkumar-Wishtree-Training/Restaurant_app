const express = require('express')
const { getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem, getAdminMenuItems } = require('../controllers/menuController')
const { isAuthenticated, isAdmin } = require('../middlewares/auth')

const router = express.Router()

router.route('/menus').get(isAuthenticated , getAllMenuItems)
router.route('/admin/menus').get(isAuthenticated , isAdmin , getAdminMenuItems)
router.route('/admin/menu/new').post(isAuthenticated , isAdmin , createMenuItem)
router.route('/admin/menu/:id').put(isAuthenticated , isAdmin , updateMenuItem).delete(isAuthenticated , deleteMenuItem)

module.exports = router