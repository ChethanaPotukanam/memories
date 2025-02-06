import postMessage from "../models/postMessage.js";
import mongoose from 'mongoose';
// Logic to get all posts
export const getPosts = async(req,res) =>{
    try{
        const postMessages = await postMessage.find();
        // console.log(postMessages)
        res.status(200).json(postMessages); // we are sending response as we got success
    }catch(error){
        // we also need to send some response when we got error
        res.status(404).json({message : error.message});
    }
}
//Logic to create a post
export const createPost = async (req,res) =>{
    const post = req.body;
    const newPost = new postMessage({...post,creator: req.userId,createdAt: new Date().toISOString()});
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({ message : error.message });
    }
}
// UPDATE POSTS
export const updatePost = async(req,res) => {
    const { id:_id } = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
    const updatedPost = await postMessage.findByIdAndUpdate(_id , {...post,_id} , {new : true});
    res.json(updatedPost);
}
//Delete POSTS
export const deletePost = async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
    await postMessage.findByIdAndDelete(id);
    res.json({message:'Post deleted successfully'})
}

export const likePost = async(req,res)=>{
    const { id } = req.params;
    if (!req.userId)
      return res.status(401).json({ message: "Unauthenticated" });
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post = await postMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await postMessage.findByIdAndUpdate(id,post,{new:true})
    res.json(updatedPost);
}