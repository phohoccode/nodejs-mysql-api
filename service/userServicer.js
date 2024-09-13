const pool = require("../database/index")

const userService = {
    handleChangePassword: async (rawdata) => {
        try {
            
            const sql = "select * from Users where id = ?"
            const [users] = await pool.query(sql, [rawdata.idUser])

            if (!users[0]) {
                return {
                    EC: 100,
                    EM: 'Không tìm thấy người dùng!',
                    DT: ''
                }
            }

            if (users[0].password !== rawdata.pass) {
                return {
                    EC: 100,
                    EM: 'Mật khẩu cũ không đúng!',
                    DT: ''
                }
            }

            const sqlUpdate = 'update Users set password = ? where id = ?'
            const [rows] = await pool.query(sqlUpdate, [rawdata.newPass, rawdata.idUser])

            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Đổi mật khẩu không thành cong!',
                    DT: ''
                }
            }

            return {
                EC: 0,
                EM: 'Đổi mật khẩu thành công!',
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
    handleChangeInfoUser: async (rawdata) => {
        try {
            
            const sql = "select * from Users where id = ?"
            const [users] = await pool.query(sql, [rawdata.id])

            if (!users[0]) {
                return {
                    EC: 100,
                    EM: 'Không tìm thấy người dùng!',
                    DT: ''
                }
            }

            const sqlUpdate = "update Users set username = ?, email = ? where id = ?"
            const [rows] = await pool.query(sqlUpdate, [rawdata.username, rawdata.email, rawdata.id])

            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Cập nhật thông tin thất bại!',
                    DT: ''
                }
            }

            return {
                EC: 0,
                EM: 'Cập nhật thông tin thành công!',
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

module.exports = userService