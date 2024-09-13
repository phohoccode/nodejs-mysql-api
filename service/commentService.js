const pool = require("../database/index")

const commentService = {
    handleGetAllComments: async (idPost) => {
        try {

            const sqlCommentsData = `
                 select 
                    Comments.id as comment_id, Comments.content, 
                    Posts.id as post_id, Users.id as user_id, Users.username 
                from Comments, Users, Posts
                where Comments.user_id = Users.id and 
                    Comments.post_id = Posts.id and Comments.post_id = ${idPost}
            `

            const [commentsData] = await pool.query(sqlCommentsData)

            return {
                EC: 0,
                EM: 'Lấy danh sách bình luận thành công!',
                DT: commentsData
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
    handleCreateComment: async (rawData) => {
        try {

            const sql = "insert into Comments (post_id, user_id, content) value (?,?,?)"
            const [rows] = await pool.query(sql, [rawData.postId, rawData.userId, rawData.content])

            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Thêm bình luận thất bại!',
                    DT: ''
                }
            }

            return {
                EC: 0,
                EM: 'Tạo bình luận thành công!',
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
    handleUpdateComment: async (rawData) => {
        try {
            const sql = "update Comments set content = ? where id = ?"
            const [rows] = await pool.query(sql, [rawData.content, rawData.id])

            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Sửa bình luận thất bại!',
                    DT: ''
                }
            }

            return {
                EC: 0,
                EM: 'Sửa bình luận thành công!',
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
    handleDeleteComment: async (commentId) => {
        try {
            const sql = "delete from Comments where id = ?"
            const [rows] = await pool.query(sql, [commentId])

            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Xoá bình luận thất bại!',
                    DT: ''
                }
            }

            return {
                EC: 0,
                EM: 'Xoá bình luận thành công!',
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

module.exports = commentService