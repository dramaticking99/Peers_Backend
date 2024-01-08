const ReelModel = require('../Models/Reel/reelModel');


class ReelServices{
    static async createReel(user_Id,videoUrl,caption){
        try{
            const createReel = new ReelModel({user_Id,videoUrl,caption});
            return await createReel.save();
        } catch(error){
            throw error;
        }
    }
}

module.exports = ReelServices;