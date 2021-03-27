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
          {/* {
          JSON.parse(localStorage.getItem('user')) ?
            <div>Hey {JSON.parse(localStorage.getItem('user')).username} 👋</div> :
            <div>Hey there! 👋</div>
         } */}
      <div className="grid grid-rows-2 md:grid-rows-6 ">
        {blogs && blogs.map(ele => 
           <BlogPreview 
            key={ele.ref.id}
            id={ele.ref.id}
            title={ele.data.title}
            author={ele.data.author}
            avatar={ele.data.avatar}
            upvote={ele.data.upvote}
            downvote={ele.data.downvote}/>
        )}
      </div>
    </div>
  );
}
