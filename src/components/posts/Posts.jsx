"use client"

import { Trash } from "lucide-react";
import { useEffect, useState } from "react"

const Posts = () => {

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [tags,setTags] = useState([]);
    const [file,setFile] = useState(null);
    const [hashtagHint,setHashtaghint] = useState(false)
    const [doneHint, setDoneHint] = useState(false);
    const [deleteHint, setDeleteHint] = useState(false);
    
    const [posts,setPosts] = useState([])

    const clear = () => {
        setTitle('');
        setContent('');
        setFile(null);
        setTags([]);
    }

    const fetchPost = async() => {
        const res = await fetch('/api/posts');
        const result = await res.json();
        setPosts(result);
    }   

    useEffect(()=>{
        fetchPost();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];
        
        const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        title,
        content,
        tags,
        file: base64data,
        contentType: file.type,
        }),
        });
        if (res.ok) {
            setDoneHint(true);
            clear();
            setTimeout(() => { setDoneHint(false); }, 4000);
            fetchPost();
            } else {
            console.error('Error uploading post');
            }
        }
        }else{
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                title,
                content,
                tags,
                }),
                });
                if (res.ok) {
                    setDoneHint(true);
                    clear();
                    setTimeout(() => { setDoneHint(false); }, 4000);
                    fetchPost();
                    } else {
                    console.error('Error uploading post');
                }
        }
        
        };
        

    const addItem = (e) => {
        e.preventDefault();
        const newItem = prompt('Enter your tag:');
        setTags((prevItems) => {
        if (prevItems.includes(newItem)) {
        if (!window.alertShown) {
        setHashtaghint(true)
        setTimeout(() => {setHashtaghint(false);}, 3000);
        window.alertShown = true;
        }
        return prevItems; // Return the previous array without changes
        }
        window.alertShown = false;
        return [...prevItems, newItem];
    })
    }
      
    const handleDeleteHashtag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleDelete = async(id) => {
        try {
            const response = await fetch(`/api/posts/${id}`,{
                method: 'DELETE'
            })
            if(response.ok){
                setPosts(posts.filter(post => post._id !== id))
                setDeleteHint(true);
                setTimeout(()=>{setDeleteHint(false)},3000)
            }else{
                console.log('DELETE FAILED!')
            }
        } catch (error) {
            console.error('An error occurred while deleting the post:', error);
        }
    }

    return(
        <div>
        <div className="w-full text-center md:text-2xl text-xl mb-8 mt-8">Add Posts</div>
        <div className="md:flex">
            <div className="md:flex-initial md:w-1/2">
            <div className="block w-[95%] ml-[2.5%]">
            <form onSubmit={handleSubmit}>
            <input name="title" type="text" className="w-full mb-2 bg-gray-100 border-2 border-gray-600 p-2 rounded-lg" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <textarea name="content" rows="5" placeholder="content" className="bg-gray-100 border-gray-600 border-2 p-2 rounded-lg resize-none w-full mb-2" value={content} onChange={e => setContent(e.target.value)} />
            <input type="file" onChange={e => setFile(e.target.files[0])} className="w-full mb-2 bg-gray-100 border-2 border-gray-600 p-2 rounded-lg" />
            <button onClick={addItem} className="w-full bg-gray-100 border-2 border-gray-600 p-2 rounded-lg text-start text-opacity-25">#</button>
            <div className="flex overflow-x-auto">
                {tags.map((tag, index) => (
                <div key={index} className="flex flex-initial items-center">
                <span>#{tag}</span>
                <button className="mr-2 text-red-500"onClick={() => handleDeleteHashtag(index)} ><Trash className='justify-self-center' /></button>
            </div>
            ))}
            {hashtagHint === true ? <div className="font-semisemibold text-red-500 px-2 py-1">This tag is existed!</div> : null}
            </div>
            <div className="flex">
            <button type="submit" className="bg-green-500  hover:bg-blue-500 mt-2 mb-8 text-white text-xl font-semibold py-1 px-6 rounded">Submit</button>
            {doneHint === true ? <div className="font-semibold text-red-500 mt-2 px-2 py-1">This post is uploaded!</div> : null}
            {deleteHint === true ? <div className="font-semibold text-red-500 mt-2 px-2 py-1">Post delete done!</div> : null}
            </div>
            </form>
            </div>
            </div>
            <div className="md:flex-initial md:w-1/2 h-auto">
            <div className="grid md:grid-cols-3 grid-cols-2 w-[95%] ml-[2.5%]">
            {posts && posts.map((item)=>{
                return(
                <div key={item._id}>
                    <div className="bg-slate-200 mb-2 mr-2 border-2 border-gray-600 rounded-lg">
                    <div className="justify-center p-2">{item.title}</div>
                    <button className="p-2 hover:text-red-500" onClick={()=>handleDelete(item._id)}><Trash /></button>
                    </div>
                </div>
                )
            })}
            </div>
            </div>
        </div></div>
    )
}

export default Posts