import { URL } from "@/components/general/URL";
import Link from "next/link";

export const metadata = {
  title: 'NEXT JS BLOG SAMPLE | HOMEPAGE',
  description: 'This is next js test description',
  keywords: 'Next js, react js, blog, test, vercel, github'
}

export default async function Home() {

  const res = await fetch(`${URL}/api/posts`);
  const posts = await res.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-auto pb-20 gap-16 pt-20 font-[family-name:var(--font-geist-sans)]">
      <div className="p-4">
      {!posts ? <div className="text-red-500 animate-pulse font-semibold md:text-xl text-lg text-center">No Posts Existed!</div> : (
        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 mt-16">
        {posts.slice(0,4).map((item)=>{
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
        })}
        </div>
        )}
      </div>
      {posts.length > 4 &&
      <Link href="/posts"><div className="font-semibold text-center md:text-lg text-md md:mt-32 mt-64 hover:text-blue-500 hover:underline hover:underline-offset-4">See More ...</div></Link>
      }
    </div>
  );
}
