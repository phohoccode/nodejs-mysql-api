const pool = require("../database/index")

const postsService = {
    handleGetAllPosts: async () => {
        try {
            const sqlpostsData = `
                SELECT 
                    Users.id AS user_id, 
                    Users.username,
                    Posts.id AS post_id, 
                    Posts.created_at,
                    Posts.title, 
                    Posts.content,
                    COUNT(Comments.id) AS comment_count
                FROM Users
                JOIN Posts ON Users.id = Posts.user_id
                LEFT JOIN Comments ON Posts.id = Comments.post_id
                GROUP BY Posts.id                
            `


            const sqlPostsLikeData = `
                select 
                    Users.id as user_id, Users.username,
                    Posts.id as post_id,
                    Likes.id as like_id
                from Users, Posts, Likes
                where Likes.user_id = Users.id and
                    Likes.post_id = Posts.id
            `

            const sqlPostsImages = `
                select Images.url, Images.post_id            
                from Posts, Images, Users
                where Posts.id = Images.post_id and
                    Users.id = Images.user_id
            `

            const [postsData] = await pool.query(sqlpostsData)
            const [postsLikeData] = await pool.query(sqlPostsLikeData)
            const [imagesData] = await pool.query(sqlPostsImages)

            const finalPostData = postsData.map(post => {
                const usersLikePost =
                    postsLikeData.filter(postLike => post.post_id === postLike.post_id)
                const imagesByPost =
                    imagesData.filter(image => post.post_id === image.post_id)

                return {
                    ...post,
                    usersLikePost,
                    images: imagesByPost
                }
            })

            console.log('finalPostData', finalPostData)

            return {
                EC: 0,
                EM: 'Lấy danh sách bài viết thành công!',
                DT: finalPostData
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
    handleCreatePost: async (rawdata) => {
        try {

            const sql = "insert into Posts (user_id, title, content) values (?,?, ?)"
            const [rows] = await pool.query(sql, [rawdata.id, rawdata.title, rawdata.content])

            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Tạo bài viết thất bại!',
                    DT: ''
                }
            }

            if (rawdata.images.length > 0) {
                const sqlInsertImages = "INSERT INTO Images (url, user_id, post_id) VALUES ?";
                const values = rawdata.images.map(image => [image, rawdata.id, rows.insertId]);

                const [rowsImages] = await pool.query(sqlInsertImages, [values]);

                if (!rowsImages.affectedRows) {
                    return {
                        EC: 1,
                        EM: 'Thêm ảnh thất thất bại!',
                        DT: ''
                    }
                }
            }

            return {
                EC: 0,
                EM: 'Tạo bài viết thành công!',
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
    handleUpdatePost: async (rawdata) => {
        try {

            const sql = "update Posts set title = ?, content = ? where id = ?"
            const [rows] = await pool.query(sql, [rawdata.title, rawdata.content, rawdata.postId])

            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Cập nhật bài viết thất bại!',
                    DT: ''
                }
            }

            if (rawdata.images && rawdata.images.length >= 0) {

                const [images] = await pool.query("select * from Images where post_id = ?", [rawdata.postId])


                if (images.length > 0) {
                    const sql = "delete from Images where post_id = ?"
                    const [rows] = await pool.query(sql, [rawdata.postId])

                    if (!rows.affectedRows) {
                        return {
                            EC: 1,
                            EM: 'Xoá ảnh thất bại!',
                            DT: ''
                        }
                    }
                }

                if (rawdata.images.length > 0) {

                    const sqlInsertImages = "INSERT INTO Images (url, user_id, post_id) VALUES ?";
                    const values = rawdata.images.map(image => [image, rawdata.userId, rawdata.postId]);
                    const [rowsImages] = await pool.query(sqlInsertImages, [values]);

                    if (!rowsImages.affectedRows) {
                        return {
                            EC: 1,
                            EM: 'Thêm ảnh thất thất bại!',
                            DT: ''
                        }
                    }
                }
            }

            return {
                EC: 0,
                EM: 'Cập nhật bài viết thành công!',
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
    handleDeletePost: async (postId) => {
        try {

            const sql = "delete from Posts where id = ?"
            const [rows] = await pool.query(sql, [postId])

            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Xoá bài viết thất bại!',
                    DT: ''
                }
            }

            return {
                EC: 0,
                EM: 'Xoá bài viết thành công',
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

module.exports = postsService