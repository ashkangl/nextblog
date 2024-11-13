import DB from '@/utils/DB';
import Posts from '@/utils/models/post';
import { S3 } from 'aws-sdk';
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        await DB();
        const post = await Posts.find();
        let p = JSON.stringify(post)
        return new NextResponse(p, {status:200})
    } catch (error) {
        return new NextResponse(error, {status:500})
    }
}



export const POST = async (req) => {
    const s3 = new S3({
    endpoint: process.env.ENDPOINT,
    accessKeyId: process.env.KEY,
    secretAccessKey: process.env.SECRET,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
    });
    
    try {
    const { file, title, content, tags, contentType } = await req.json();
    if(file){
    const randomKey = Math.floor(Math.random() * 123456789);
    const buffer = Buffer.from(file, 'base64');
    const params = {
    Bucket: process.env.BUCKET,
    Key: `/${process.env.FOLDER}/image-${randomKey}`,
    Body: buffer,
    ContentType: contentType || 'application/octet-stream',
    ACL: 'public-read',
    };
    
    const response = await s3.upload(params).promise();
    
        const newPost = new Posts({
            title,
            content,
            tags,
            filename: response.Key,
        });
        await newPost.save();
    }else{
        const newPost = new Posts({
            title,
            content,
            tags,
        });
        await newPost.save();
    }
    return NextResponse.json({message: 'upload succesfull'}, { status: 201 });
    } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
    };