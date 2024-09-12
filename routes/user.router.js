const express = require("express")
const router = express.Router()

const userController = require('../controller/user.controller')

router.post('/change-password', userController.changePass)
router.post('/change-info', userController.changeInfo)

module.exports = router
