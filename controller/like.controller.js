const pool = require("../database/index")

const likeController = {
    likePost: async (req, res) => {
        try {
            const { userId, postId } = req.body
            const sql = "insert into Likes (user_id, post_id) values (?, ?)"
            await pool.query(sql, [userId, postId])

            return res.json({
                EC: 0,
                EM: 'Thích bài viết thành công!',
                DT: ''
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
            const { userId, postId } = req.body
            const sql = "delete from Likes where post_id = ? and user_id = ?"
            await pool.query(sql, [postId, userId])

            return res.json({
                EC: 0,
                EM: 'Bỏ thích bài viết thành công!',
                DT: ''
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