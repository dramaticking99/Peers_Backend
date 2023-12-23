const UserModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');

class UserService{
    static async registerUser(email,password){
        try{
            const createUser = new UserModel({email,password});
            return await createUser.save();
        } catch(err){
            throw err;
        }
    }

    static async checkUser(email){
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData,secreatkey,jwt_expire){
        const token = jwt.sign(tokenData,secreatkey,{expiresIn:jwt_expire});
        return token;
    }
}

module.exports = UserService;