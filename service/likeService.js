const pool = require("../database/index")

const likeService = {
    handleLikePost: async (rawdata) => {
        try {
            const sql = "insert into Likes (user_id, post_id) values (?, ?)"
            const [rows] = await pool.query(sql, [rawdata.userId, rawdata.postId])

            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Thích bài viết thất bại!',
                    DT: ''
                }
            }

            return {
                EC: 0,
                EM: 'Thích bài viết thành công!',
                DT: ''
            }
        } catch (error) {
            console.log(error)
            return {
                EC: 300,
                EM: 'Lỗi server',
                DT: ''
            }
        }
    },
    handleUnlikePost: async (rawdata) => {
        try {
            const sql = "delete from Likes where post_id = ? and user_id = ?"
            const [rows] = await pool.query(sql, [rawdata.postId, rawdata.userId])

            
            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Bỏ thích bài viết thất bại!',
                    DT: ''
                }
            }

            return {
                EC: 0,
                EM: 'Bỏ thích bài viết thành công!',
                DT: ''
            }
        } catch (error) {
            console.log(error)
            return {
                EC: 300,
                EM: 'Lỗi server',
                DT: ''
            }
        }
    }
}

module.exports = likeService