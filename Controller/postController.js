const PostServices = require("../Services/postServices")

exports.createPost = async(req,res,next)=>{
    try{
        const{user_Id,arrayPost_Id,caption} = req.body;

        const successRes = await PostServices.createPost(user_Id,arrayPost_Id,caption);

        res.json({status:true,success:"Post Created Successfully"})

    } catch(error){
        throw(error);
    }
    
}

exports.likePost = async(req,res,next)=>{
    try {
        const{post_Id} = req.body;

        const successRes = await PostServices.likePost(post_Id);

        res.json({status:true,success:"post liked successfully"});


    } catch (error) {
        throw(error);
    }
}

exports.removeLike = async(req,res,next)=>{
    try{
        const{post_Id} = req.body;

        const successRes = await PostServices.removeLike(post_Id);

        res.json({status:true,success:"like Removed Successfully"})
    } catch (error){
        throw error
    }
}

exports.addComment = async(req,res,next)=>{
    try {
        const {commentString,post_Id,user_Id} = req.body;

        const successRes = await PostServices.addComment(commentString,post_Id,user_Id);

        res.json({status:true,success:"Comment added sucesfully"})

    } catch (error) {
        throw(error);
    }
}


exports.deleteComment = async(req,res,next)=>{
    try{
        const {comment_Id} = req.body;

        const successRes = await PostServices.deleteComment(comment_Id);

        res.json({status:true,success:"Comment deleted sucesfully"})


    } catch (error){

    }
}