require('dotenv').config()
const jwt = require('jsonwebtoken')

const authService = require('../service/authService')

const authController = {
    register: async (req, res) => {
        try {
            const data = await authService.handleRegister(req.body.data)

            return res.json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })

        } catch (error) {
            console.log(error)
            return res.json({
                EC: 300,
                EM: 'Lỗi server!',
                DT: ''
            })
        }
    },
    login: async (req, res) => {
        try {
            const data = await authService.handleLogin(req.body.data)

            if (+data.EC === 0) {
                
                const payload = {
                    id: data.DT.id,
                    email: data.DT.email,
                    username: data.DT.username,
                }
    
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
                res.cookie(process.env.KEY_NAME, token, { httpOnly: true, maxAge: 86400000 });
            }

            return res.json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        } catch (error) {
            console.log(error)
            return res.json({
                EC: 300,
                EM: 'Lỗi server!',
                DT: ''
            })
        }
    },
    logout: (req, res) => {
        try {
            res.clearCookie(process.env.KEY_NAME)
            return res.json({
                EM: 'Đăng xuất thành công!',
                EC: 0,
                DT: ''
            })
        } catch (error) {
            console.log(error)
            return res.json({
                EC: 300,
                EM: 'Lỗi server!',
                DT: ''
            })
        }
    },
    decodeToken: (req, res) => {
        try {
            const cookies = req.cookies
            const token = cookies.phohoccode

            if (!token) {
                console.log('Token không tồn tại!')
                return res.json({
                    EC: 100,
                    EM: 'Token không tồn tại!',
                    DT: ''
                })
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if (!decoded) {
                return res.json({
                    EC: 101,
                    EM: 'Xác minh người dùng thất bại!',
                    DT: ''
                })
            }

            return res.json({
                EC: 0,
                EM: 'Xác minh người dùng thành công',
                DT: {
                    account: decoded
                }
            })
        } catch (error) {
            console.log(error)
            return res.json({
                EC: 300,
                EM: 'Lỗi server!',
                DT: ''
            })
        }
    }
}

module.exports = authController