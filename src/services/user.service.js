const User = require('../models/user.model');

class UserService {
    static async createUser(userData) {
        const user = new User(userData);
        await user.save();
        user.password = undefined;
        return user;
    }

    static async loginUser(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const token = user.generateAuthToken();
        user.password = undefined;
        return { user, token };
    }

    static async getUserById(userId) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    static async updateUser(userId, updates) {
        const user = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

module.exports = UserService;