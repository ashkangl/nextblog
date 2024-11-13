import DB from "@/utils/DB";
import Posts from "@/utils/models/post";
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
    const {id} = await params;
    await DB();
    const post = await Posts.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
}