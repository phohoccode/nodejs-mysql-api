const pool = require("../database/index")
const postsService = require("../service/postsService")

const postsController = {
    getAll: async (req, res) => {
        try {

            const data = await postsService.handleGetAllPosts()

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
                id: req.params.id,
                title: req.body.title,
                content: req.body.content
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
            // const { id } = req.params

            // const sql = "delete from Posts where id = ?"
            // await pool.query(sql, [id])

            // return res.json({
            //     EC: 0,
            //     EM: 'Xoá bài viết thành công',
            //     DT: []
            // })

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