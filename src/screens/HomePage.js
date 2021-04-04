import { useEffect, useState } from 'react';
import BlogPreview from '../components/BlogPreview'
import Navbar from '../components/Navbar';
import {getPosts} from '../models'

export default function HomePage() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    async function fetchBlogs() {
      // You can await here
      let data = await getPosts()
      console.log(data)
      setBlogs(data)
    }
    fetchBlogs();
  }, [])
  return (
    <div className="App">
        <Navbar />
        {localStorage.getItem('userId') && <div>Hello {localStorage.getItem('username')}</div>}
      <div className="grid grid-rows-2 md:grid-rows-6 ">
        {blogs.length > 0 ? blogs.map(ele => 
           <BlogPreview 
            key={ele.ref.id}
            id={ele.ref.id}
            title={ele.data.title}
            author={ele.data.author}
            avatar={ele.data.avatar}
            upvote={ele.data.upvote}
            downvote={ele.data.downvote}/>
        ): 'No blog has been created yet. Be the first to create'}
      </div>
    </div>
  );
}
