const pool = require("../database/index")
const likeService = require("../service/likeService")

const likeController = {
    likePost: async (req, res) => {
        try {

            const data = await likeService.handleLikePost(req.body)

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
    unlikePost: async (req, res) => {
        try {

            const data = await likeService.handleUnlikePost(req.body)

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

module.exports = likeController