import Link from "next/link"

const Header = () =>{
    return(
        <div className="mb-16  flex md:w-[50%] md:ml-[25%] w-[75%] ml-[12.5%] justify-between mt-8">
            <Link href="/"><div className="font-bold md:text-xl text-lg hover:text-blue-500 hover:underline hover:underline-offset-4">Homepage</div></Link>
            <Link href="/posts"><div className="font-bold md:text-xl text-lg hover:text-blue-500 hover:underline hover:underline-offset-4">Posts</div></Link>
            <Link href="/addPosts"><div className="font-bold md:text-xl text-lg hover:text-blue-500 hover:underline hover:underline-offset-4">Add Posts</div></Link>
        </div>
    )
}

export default Header