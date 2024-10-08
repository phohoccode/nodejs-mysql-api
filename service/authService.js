require('dotenv').config()
const pool = require("../database/index")
const jwt = require('jsonwebtoken')

const authService = {
    handleRegister: async (rawdata) => {

        try {
            const { email, password, username } = rawdata

            const sql = "select * from Users where email = ?"
            const [users] = await pool.query(sql, [email])

            if (users[0]) {
                return {
                    EC: 103,
                    EM: 'Địa chỉ email đã tồn tại!',
                    DT: ''
                }
            }

            const sqlInsert = `
                insert into Users (email, password, username, phone, address, gender) 
                values (?, ?, ?, ?, ?, ?)
            `
            const [rows] =
                await pool.query(sqlInsert, [email, password, username, '', '', 0])

            if (!rows.affectedRows) {
                return {
                    EC: 1,
                    EM: 'Đăng ký tài khoản thất bại!',
                    DT: ''
                }
            }

            return {
                EC: 0,
                EM: 'Đăng ký tài khoản thành công!',
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