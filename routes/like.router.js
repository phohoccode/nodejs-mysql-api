const express = require("express")
const router = express.Router()

const likeController = require('../controller/like.controller') 

router.post('/like-post', likeController.likePost)
router.post('/unlike-post', likeController.unlikePost)

module.exports = router
