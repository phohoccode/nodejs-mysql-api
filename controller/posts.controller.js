const pool = require("../database/index")
const postsService = require("../service/postsService")

const postsController = {
    getAll: async (req, res) => {
        try {

            const data = await postsService.handleGetAllPosts()
            console.log(data)
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
    create: async (req, res) => {
        try {

            const data = await postsService.handleCreatePost(req.body)

            return res.json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        } catch (error) {
            console.log(error)
            console.log(error)
            return res.json({
                EC: 1,
                EM: 'Lỗi server',
                DT: []
            })
        }
    },
    update: async (req, res) => {
        try {

            const rawdata = {
                postId: req.body.id,
                userId: req.body.userId,
                title: req.body.title,
                content: req.body.content,
                images: req.body.images
            }

            const data = await postsService.handleUpdatePost(rawdata)

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
    delete: async (req, res) => {
        try {
            const data = await postsService.handleDeletePost(req.params.id)

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

module.exports = postsController