const pool = require("../database/index")

const userController = {
    changePass: async (req, res) => {
        try {
            const { idUser, pass, newPass } = req.body
            
            const [user] = await pool.query("select * from Users where id = ?", [idUser])
            console.log(user);

            if (!user[0]) {
                return res.json({
                    EC: -2,
                    EM: 'Không tìm thấy người dùng!',
                    DT: ''
                })
            }

            if (user[0].password !== pass) {
                return res.json({
                    EC: -3,
                    EM: 'Mật khẩu cũ không đúng!',
                    DT: ''
                })
            }

            const sql = `update Users set password = ? where id = ?`
            await pool.query(sql, [newPass, idUser])

            return res.json({
                EC: 0,
                EM: 'Đổi mật khẩu thành công!',
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
    changeInfo: async (req, res) => {
        try {
            const { id, email, username } = req.body
            
            const [user] = await pool.query("select * from Users where id = ?", [id])

            if (!user[0]) {
                return res.json({
                    EC: -2,
                    EM: 'Không tìm thấy người dùng!',
                    DT: ''
                })
            }

            const sql = "update Users set username = ?, email = ? where id = ?"
            await pool.query(sql, [username, email, id])
            
            res.clearCookie("phohoccode")

            return res.json({
                EC: 0,
                EM: 'Thay đổi thông tin thành công!',
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

module.exports = userController