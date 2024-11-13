async function getData(id) {
    const res = await fetch(`${process.env.URL}/api/posts/${id}`, {
      cache: "no-cache"},
      {next:{revalidate : '36000'}
    });
    if (!res.ok) {
    return notFound();
    }
    
    return res.json();
}

export async function generateMetadata({params}) {
    const { id } = await params
    const data = await getData(id)
      return {
      title: `${data.title}`,
      description: `${data.title} , This is description test for next js blog`,
      keywords: `${data.title}, next js, blog, react js, vercel`,
      };
    }

export default async function Page({ params }) {
    const { id } = await params
    const data = await getData(id);

    const formattedDate = new Date(data.createdAt).toLocaleString();
    return(
        <div className="md:w-[80%] md:ml-[10%] w-[95%] ml-[2.5%]">
            <div>
                {data.filename && 
                <div>
                    <img src={`${process.env.STORAGE}/${data.filename}`} alt={data.title} className="w-full h-auto rounded-xl shadow-lg"/>
                </div>}
                <div>
                    <div className="mt-8 font-semibold p-2 md:text-xl text-lg">{data.title}</div>
                    <div className="mt-8 p-2 md:text-lg text-md text-justify">{data.content}</div>
                    <div className="md:flex md:justify-between mt-8">
                        <div className="p-2">{formattedDate}</div>
                        <div className="flex p-2">{data.tags && data.tags.map((item)=>{
                            return(
                                <div key={item} className="p-2">#{item}</div>
                            )
                        })}</div>
                    </div>
                </div>
            </div>
        </div>
    )
  }

