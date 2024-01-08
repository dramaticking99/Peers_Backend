const ReelServices = require("../Services/reelServices");


exports.createReel = async(req,res,next)=>{
    try {
        const{user_Id,videoUrl,caption} = req.body;

        const successRes = await ReelServices.createReel(user_Id,videoUrl,caption);

        res.json({status:true, success:"Reel Created successfully"})

    } catch (error) {
        throw(error)
    }
}
