const UserService = require("../Services/userServies");

exports.register = async(req,res,next)=>{
    try{
        const{email,password} = req.body;

        const successRes = await UserService.registerUser(email,password);

        res.json({status:true,success:"User Registered Successfully"})
    } catch(error){
        throw error;
    }
}

exports.login = async(req,res)=>{
    try {
        const{email,password} = req.body;
        console.log(password);

        const user = await UserService.checkUser(email);

        if(!user){
            res.json({status:"false",failure:"User does not exist"});
            throw new error("user does not exist");
        } 

        const isMatch = await user.comparePassword(password);

        if(isMatch == false){
            throw new error("password Invalid");
        } 
        
        let tokenData = {_id:user._id,email:user.email}

        const token = await UserService.generateToken(tokenData,"secreatKey","1h");
        
        res.status(200).json({status:true, token: token});
        
    } catch (error) {
        throw error;
    }
}