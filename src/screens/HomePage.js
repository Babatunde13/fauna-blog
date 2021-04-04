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
  return (
    <div className="">
        <Navbar />
        <hr/>
      <div className="row">
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
