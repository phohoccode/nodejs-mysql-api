const pool = require("../database/index")

const commentController = {
    getAllComments: async (req, res) => {
        try {
            const { id } = req.params

            const [comments] = await pool.query(`select * from Comments where post_id = ${id}`)

            if (comments.length > 0) {

                const userIds = comments.map(comment => comment.user_id);
                const [users] = await pool.query(
                    `SELECT id, username FROM Users WHERE id IN (${userIds.join(',')})`
                );

                const commentsWithUsername = comments.map(comment => {
                    const user = users.find(user => user.id === comment.user_id);
                    return {
                        ...comment,
                        username: user ? user.username : 'Unknown'
                    };
                });
                res.json({
                    EC: 0,
                    EM: 'Lấy danh sách bình luận thành công!',
                    DT: commentsWithUsername
                })
            } else {
                res.json({
                    EC: 0,
                    EM: 'Lấy danh sách bình luận thành công!',
                    DT: []
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                EC: 1,
                EM: 'Lỗi server',
                DT: []
            })
        }
    },
    createComment: async (req, res) => {
        try {
            const { userId, postId, content } = req.body
            const sql = "insert into Comments (post_id, user_id, content) value (?,?,?)"
            await pool.query(sql, [postId, userId, content])

            res.json({
                EC: 0,
                EM: 'Bình luận thành công!',
                DT: ''
            })
        } catch (error) {
            console.log(error)
            res.json({
                EC: 1,
                EM: 'Lỗi server',
                DT: []
            })
        }
    },
    deleteComment: async (req, res) => {
        try {
            const { id } = req.params

            const sql = "delete from Comments where id = ?"
            await pool.query(sql, [id])

            res.json({
                EC: 0,
                EM: 'Xoá bình luận thành công',
                DT: []
            })
        } catch (error) {
            console.log(error)
            res.json({
                EC: 1,
                EM: 'Lỗi server',
                DT: []
            })
        }
    },
    updateComment: async (req, res) => {
        try {
            const { content } = req.body
            const { id } = req.params

            const sql = "update Comments set content = ? where id = ?"
            await pool.query(sql, [content, id])

            res.json({
                EC: 0,
                EM: 'Cập nhật bình luận thành công!',
                DT: []
            })
        } catch (error) {
            console.log(error)
            res.json({
                EC: 1,
                EM: 'Lỗi server',
                DT: []
            })
        }
    }
}

module.exports = commentController