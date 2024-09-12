const express = require("express")
const router = express.Router()

const authController = require("../controller/auth.controller")

router.get('/decode-token', authController.decodeToken)
router.post("/register", authController.register)
router.post("/login", authController.login)
router.get('/logout', authController.logout)


module.exports = router