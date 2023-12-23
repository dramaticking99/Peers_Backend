const PostModel = require('../Models/Post/postModel');
const CommentModel = require('../Models/Post/commentModel');
const jwt = require('jsonwebtoken');


class PostService{
    static async createPost(user_Id,arrayPost_Id,caption){
        try{
            const createPost = new PostModel({user_Id,arrayPost_Id,caption});
            return await createPost.save();

        } catch(error){
            throw error;
        }
    }

    static async likePost(post_Id){
        try {
            const post = await PostModel.findOne({ _id: post_Id });


            if(!post){
                throw new Error("post not found");
            }

            post.likes += 1;

            await post.save();

            return post;
        } catch (error) {
            throw(error);
        }
    }

    static async removeLike(post_Id){
        try {
            const post = await PostModel.findOne({_id: post_Id});

            if(!post){
                return "No such post found";
            }
            post.likes -= 1;

            await post.save();

            return post;
        } catch (error) {
            throw error
        }
    }

    static async addComment(commentString,post_Id,user_Id){

        try {
            const createComment = new CommentModel({commentString,post_Id,user_Id})
            const savedComment = await createComment.save();

            //updating the post's comments array with this comment
            const post = await PostModel.findOne({_id:post_Id});
            if(!post){
                throw new Error('post not found');
            }

            post.arrayComment_Id.push(savedComment._id);
            await post.save();

            return savedComment;

        } catch (error) {
            throw(error)
        }
    }

    static async deleteComment(comment_Id) {
        try {
            const deletedComment = await CommentModel.findByIdAndDelete(comment_Id);
    
            const post_Id = deletedComment.post_Id;
    
            const post = await PostModel.findOne({ _id: post_Id });
    
            post.arrayComment_Id = post.arrayComment_Id.filter(id => id !== comment_Id);
            console.log(post.arrayComment_Id);
    
            await post.save();
    
            return deletedComment;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = PostService;