const express = require("express")
const router = express.Router()

const commentController = require('../controller/comment.controller')

router.get("/read/:id", commentController.getAllComments)
router.post("/create", commentController.createComment)
router.delete('/delete/:id', commentController.deleteComment)
router.put('/update/:id', commentController.updateComment)

module.exports = router