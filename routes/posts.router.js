const express = require("express")
const router = express.Router()

const postsController = require("../controller/posts.controller")

router.get("/read", postsController.getAll)
router.post("/create", postsController.create)
router.put("/update/:id", postsController.update)
router.delete("/delete/:id", postsController.delete)

module.exports = router