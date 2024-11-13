import { URL } from "@/components/general/URL";
import Link from "next/link";

export const metadata = {
    title: "Next JS blog posts",
    description: "This is Next JS blog posts page description",
    keywords: "Next JS, React JS, Next JS blog, blog, posts, vercel"
}

const Page = async() => {

    const res = await fetch(`${URL}/api/posts`);
    const posts = await res.json();

    return(
        <div className="grid md:grid-cols-4 grid-cols-2 md:w-[80%] md:ml-[10%] w-[95%] ml-[2.5%] mb-24 md:gap-4 gap-2">
        {!posts ? <div>No Post To Show!</div>:(
            posts.map((item)=>{
                return(
                <div key={item._id} className="rounded-xl bg-gray-200 hover:scale-110 duration-500">
                    <Link href={`/posts/${item._id}`}>
                    <div>
                        {!item.filename ? <div className="w-full h-48 rounded-t-xl shadow-lg bg-slate-600 text-white text-center">No Image</div> : (
                        <img src={`${process.env.Storage}/${item.filename}`} alt={item.title} className="w-full h-48 rounded-t-xl shadow-lg" />
                        )}
                        <div className="p-2 font-semibold md:text-lg text-md">{item.title}</div>
                    </div>
                    </Link>
                </div>
                )
            })
        )}
        </div>
    )
}

export default Page