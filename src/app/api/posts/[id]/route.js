import DB from "@/utils/DB";
import Posts from "@/utils/models/post";
import { S3 } from "aws-sdk";
import { NextResponse } from "next/server"


export const GET = async(req,{params}) => {
    const {id} = await params;
    try {
        await DB();
        const post = await Posts.findById(id);
        let p = JSON.stringify(post);
        return new NextResponse(p,{status:200})
    } catch (error) {
        return new NextResponse(error,{status:500})
    }
}

export const DELETE = async(req,{params})=>{
    const s3 = new S3({
        endpoint: process.env.ENDPOINT,
        accessKeyId: process.env.KEY,
        secretAccessKey: process.env.SECRET,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
    });
    const {id} = await params;
    await DB();
    const singlePost = await Posts.findById(id);
    const post = await Posts.findByIdAndDelete(id);
    await s3.deleteObject({ Bucket: process.env.BUCKET, Key: singlePost.filename }).promise();
    return new NextResponse(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
}