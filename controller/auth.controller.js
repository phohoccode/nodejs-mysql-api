const pool = require("../database/index")
const bcrypt = require('bcrypt')
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
            if (user.length !== 0) {
                return res.json({
                    EC: 0,
                    EM: 'Đăng nhập thành công!',
                    DT: {
                        id: user[0].id,
                        email: user[0].email,
                        username: user[0].username,
                        created_at: user[0].created_at
                    }
                })
            } else {
                return res.json({
                    EC: -1,
                    EM: 'Email hoặc mật khẩu không đúng!',
                    DT: ''
                })
            }
            // if (!user[0]) return res.json({ error: "Invalid email!" })

            // const { password: hash, id, name } = user[0]

            // const check = await bcrypt.compare(password, hash)

            // if (check) {
            //     const accessToken = jwt.sign({ userId: id }, '3812932sjad34&*@', { expiresIn: '1h' });
            //     return res.json({ 
            //         accessToken,
            //         data: { 
            //             userId: id,
            //             name,
            //             email
            //         }
            //      })

            // }

            // return res.json({ error: "Wrong password!" })

        } catch (error) {
            console.log(error)
            return res.json({
                EC: -1,
                EM: 'Lỗi server!',
                DT: ''
            })
        }
    },
}

module.exports = authController