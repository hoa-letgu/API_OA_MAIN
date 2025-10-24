const UserService = require('../services/user.service');

class UserController {
    static async register(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            const token = user.generateAuthToken();
            res.status(201).json({
                success: true,
                data: {
                    user,
                    token
                }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await UserService.loginUser(email, password);
            res.json({
                success: true,
                data: {
                    user,
                    token
                }
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getProfile(req, res) {
        try {
            const user = await UserService.getUserById(req.user._id);
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = UserController;