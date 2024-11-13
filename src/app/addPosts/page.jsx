import Posts from "@/components/posts/Posts";

export const metadata = {
    title: "Add Posts On Blog",
    description: "This is description for next js blog",
    keywords: "upload post, upload image, upload tags, add posts, next js, react js, next js blog, vercel"
}

const Page = () => {
    return(
        <div>
            <Posts />
        </div>
    )
}

export default Page