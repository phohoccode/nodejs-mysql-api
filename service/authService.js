require('dotenv').config()
const pool = require("../database/index")
const jwt = require('jsonwebtoken')

const authService = {
    handleRegister: async (rawdata) => {

        try {
            const sql = "select * from Users where email = ?"
            const [users] = await pool.query(sql, [rawdata.emaail])

            if (users[0]) {
                return {
                    EC: 103,
                    EM: 'Địa chỉ email đã tồn tại',
                    DT: ''
                }
            }

            const sqlInsert = "insert into Users (email, password, username) values (?, ?, ?)"
            const [rows] =
                await pool.query(sqlInsert, [rawdata.email, rawdata.password, rawdata.username])

            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Đăng ký không thành công!',
                    DT: ''
                }
            }

            return {
                EC: 0,
                EM: 'Đăng ký thành công!',
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
    handleLogin: async (rawdata) => {

        try {
            const sql = "select * from Users where email = ? and password = ?"
            const [users] =
                await pool.query(sql, [rawdata.email, rawdata.password])

            if (!users[0]) {
                return {
                    EC: 100,
                    EM: 'Thông tin tài khoản không đúng!',
                    DT: ''
                }
            }

            return {
                EC: 0,
                EM: 'Đăng nhập thành công!',
                DT: users[0]
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

module.exports = authService