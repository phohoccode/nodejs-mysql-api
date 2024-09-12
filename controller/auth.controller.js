require('dotenv').config()
const pool = require("../database/index")
const jwt = require('jsonwebtoken')

const authController = {
    register: async (req, res) => {
        try {
            const { email, password, username } = req.body.data
            const [user,] = await pool.query("select * from Users where email = ?", [email])
            if (user[0]) return res.json({ error: "Email already exists!" })

            // const hash = await bcrypt.hash(password, 10)

            const sql = "insert into Users (email, password, username) values (?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [email, password, username])

            if (rows.affectedRows) {
                return res.json({
                    EC: 0,
                    EM: 'Đăng ký thành công!',
                    DT: ''
                })
            } else {
                return res.json({
                    EC: 1,
                    EM: 'Đăng ký không thành công!',
                    DT: ''
                })
            }

        } catch (error) {
            console.log(error)
            return res.json({
                EC: -1,
                EM: 'Lỗi server!',
                DT: ''
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body.data
            const [user,] = await pool.query("select * from Users where email = ? and password = ?", [email, password])

            console.log(user[0]);
            if (user[0]) {
                const payload = {
                    id: user[0].id,
                    email: user[0].email,
                    username: user[0].username,
                }

                const token =
                    jwt.sign(payload, process.env.TOKEN_PAYLOAD, { expiresIn: '24h' })

                // cookie sống được trong 24h
                res.cookie('phohoccode', token, { httpOnly: true, maxAge: 86400000  });

                return res.status(200).json({
                    EC: 0,
                    EM: 'Đăng nhập thành công!',
                    DT: ''
                })
            } else {
                return res.json({
                    EC: -1,
                    EM: 'Email hoặc mật khẩu không đúng!',
                    DT: ''
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                EC: -1,
                EM: 'Lỗi server!',
                DT: ''
            })
        }
    },
    logout: (req, res) => {
        try {
            res.clearCookie("phohoccode")
            return res.status(200).json({
                EM: 'Đăng xuất thành công',
                EC: 0,
                DT: ''
            })
        } catch (error) {
            console.log(error)
            return res.json({
                EC: -1,
                EM: 'Lỗi server!',
                DT: ''
            })
        }
    },
    decodeToken: (req, res) => {
        try {
            const cookies = req.cookies
            const key = process.env.TOKEN_PAYLOAD

            if (!cookies.phohoccode) {
                console.log('Token không tồn tại!')
                return res.json({
                    EC: 1,
                    EM: 'Token không tồn tại!',
                    DT: ''
                })
            }

            const decoded = jwt.verify(cookies.phohoccode, key)

            if (decoded) {
                return res.json({
                    EC: 0,
                    EM: 'Xác minh người dùng thành công',
                    DT: {
                        account: decoded
                    }
                })
            } else {
                return res.json({
                    EC: -2,
                    EM: 'Xác minh người dùng thất bại!',
                    DT: ''
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                EC: -1,
                EM: 'Lỗi server!',
                DT: ''
            })
        }
    }
}

module.exports = authController