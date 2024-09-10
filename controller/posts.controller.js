const pool = require("../database/index")

const postsController = {
    getAll: async (req, res) => {
        try {
            const [posts] = await pool.query("select * from Posts")

            if (posts.length > 0) {
                const userIds = posts.map(post => post.user_id);
                const [users] = await pool.query(
                    `SELECT id, username FROM Users WHERE id IN (${userIds.join(',')})`
                );
    
    
                // Xây dựng lại dữ liệu bài viết với thông tin username
                const postsWithUsername = posts.map(post => {
                    const user = users.find(user => user.id === post.user_id);
                    return {
                        ...post,
                        username: user ? user.username : 'Unknown'
                    };
                });
    
                res.json({
                    EC: 0,
                    EM: 'Lấy danh sách bài viết thành công!',
                    DT: postsWithUsername
                })
            } else {
                res.json({
                    EC: 0,
                    EM: 'Lấy danh sách bài viết thành công!',
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
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from posts where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const { userId, title, content } = req.body
            const sql = "insert into Posts (user_id, title, content) values (?,?, ?)"
            const [rows, fields] = await pool.query(sql, [userId, title, content])
            res.json({
                EC: 0,
                EM: 'Tạo bài viết thành công',
                DT: []
            })
        } catch (error) {
            console.log(error)
            console.log(error)
            res.json({
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

            res.json({
                EC: 0,
                EM: 'Cập nhật bài viết thành công!',
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
    delete: async (req, res) => {
        try {
            const { id } = req.params

            const sql = "delete from Posts where id = ?"
            await pool.query(sql, [id])

            res.json({
                EC: 0,
                EM: 'Xoá bài viết thành công',
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

module.exports = postsController