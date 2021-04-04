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
      setBlogs(data)
    }
    fetchBlogs();
  }, [])
  console.log(blogs)
  return (
    <div className="App">
        <Navbar />
        {localStorage.getItem('userId') ? <div>Hello {localStorage.getItem('username')} 👋 </div>: 'Hey there 👋 '}
        <hr/>
      <div className="grid grid-rows-2 md:grid-rows-6 ">
        {blogs.length > 0 ? blogs.map(blog => 
          <>
             <BlogPreview 
            key={blog.ref.value.id}
            id={blog.ref.value.id}
            title={blog.data.title}
            author={blog.data.author}
            avatar={blog.data.avatar}
            upvote={blog.data.upvote}
            downvote={blog.data.downvote}/>
            <hr/>
          </>
        ): 'No blog has been created yet. Be the first to create'}
      </div>
    </div>
  );
}
