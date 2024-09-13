const pool = require("../database/index")
require('dotenv').config()

const userService = require('../service/userServicer')

const userController = {
    changePass: async (req, res) => {
        try {
            const data = await userService.handleChangePassword(req.body)

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
    changeInfo: async (req, res) => {
        try {

            const data = await userService.handleChangeInfoUser(req.body)

            if (+data.EC === 0) {
                res.clearCookie(process.env.KEY_NAME)
            }
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

module.exports = userController