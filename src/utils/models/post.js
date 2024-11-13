import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title:String,
    content:String,
    tags:[String],
    filename:String
},{timestamps:true})

const Posts = mongoose.models.Posts || mongoose.model('Posts', postSchema, 'posts');

export default Posts;