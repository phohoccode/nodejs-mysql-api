const pool = require("../database/index")

const postsController = {
    getAll: async (req, res) => {
        try {
            const [posts] = await pool.query("select * from Posts")

            if (posts.length > 0) {
                const userIds = posts.map(post => post.user_id);
                const postIds = posts.map(post => post.id)

                const [users] = await pool.query(
                    `SELECT id, username FROM Users WHERE id IN (${userIds.join(',')})`
                );
                
                const [comments] = await pool.query(
                    `SELECT id, post_id, user_id FROM Comments WHERE post_id IN (${postIds.join(',')})`
                );

                const [likes] = await pool.query(
                    `SELECT id, post_id, user_id FROM Likes WHERE post_id IN (${postIds.join(',')})`
                )

                const builtDataPosts = posts.map(post => {
                    const user = users.find(user => user.id === post.user_id);
                    const countComment = comments.filter(comment => comment.post_id === post.id)
                    const likePosts = likes.filter(like => like.post_id === post.id)
                    const finalLikePost = likePosts.map(likePost => {
                        const user = users.find(user => user.id === likePost.user_id)

                        return {
                            ...likePost,
                            userLikePost: user.username
                        }
                    })
                    
                    return {
                        ...post,
                        username: user ? user.username : 'Unknown',
                        countComment: countComment.length,
                        finalLikePost
                    };
                });
    
                return res.json({
                    EC: 0,
                    EM: 'Lấy danh sách bài viết thành công!',
                    DT: builtDataPosts.reverse()
                })
            } else {
                return res.json({
                    EC: 0,
                    EM: 'Lấy danh sách bài viết thành công!',
                    DT: []
                })
            }
          
        } catch (error) {
            console.log(error)
            return res.json({
                EC: 1,
                EM: 'Lỗi server',
                DT: []
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from posts where id = ?", [id])
            return res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            return res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const { id, title, content } = req.body
            const sql = "insert into Posts (user_id, title, content) values (?,?, ?)"
            const [rows, fields] = await pool.query(sql, [id, title, content])
            return res.json({
                EC: 0,
                EM: 'Tạo bài viết thành công',
                DT: []
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
            const { title, content } = req.body
            const { id } = req.params

            const sql = "update Posts set title = ?, content = ? where id = ?"
            await pool.query(sql, [title, content, id])

            return res.json({
                EC: 0,
                EM: 'Cập nhật bài viết thành công!',
                DT: []
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
            const { id } = req.params

            const sql = "delete from Posts where id = ?"
            await pool.query(sql, [id])

            return res.json({
                EC: 0,
                EM: 'Xoá bài viết thành công',
                DT: []
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