const pool = require("../database/index")
const commentService = require("../service/commentService")

const commentController = {
    getAllComments: async (req, res) => {
        try {

            const data = await commentService.handleGetAllComments(req.params.id)

            return res.json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        } catch (error) {
            console.log(error)
            return res.json({
                EC: 1,
                EM: 'Lỗi server',
                DT: []
            })
        }
    },
    createComment: async (req, res) => {
        try {

            const data = await commentService.handleCreateComment(req.body)

            return res.json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        } catch (error) {
            console.log(error)
            return res.json({
                EC: 1,
                EM: 'Lỗi server',
                DT: []
            })
        }
    },
    deleteComment: async (req, res) => {
        try {

            const data = await commentService.handleDeleteComment(req.params.id)

            return res.json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        } catch (error) {
            console.log(error)
            return res.json({
                EC: 1,
                EM: 'Lỗi server',
                DT: []
            })
        }
    },
    updateComment: async (req, res) => {
        try {

            const rawData = {
                id: req.params.id,
                content: req.body.content
            }

            const data = await commentService.handleUpdateComment(rawData)

            return res.json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        } catch (error) {
            console.log(error)
            return res.json({
                EC: 1,
                EM: 'Lỗi server',
                DT: []
            })
        }
    }
}

module.exports = commentController