// import upvote and downvote icons 
import {Redirect, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import {getPost, upvotePost, downvotePost, /*viewCount*/} from '../models'

const Blog = () => {
  const {id} = useParams()
  const [blogData, setBlogData] = useState({})

  const handleUpvote = e => {
    blogData.upvote += 1
    upvotePost(blogData.upvotePost, id)
  }

  const handleDownvote = e => {
    blogData.downvote += 1
    downvotePost(blogData.upvote, id)
  }
  // fetch data from the server
  useEffect(() => {
    async function fetchBlog() {
      // You can await here
      let data = await getPost(id)
      console.log(data)
      if (data) {
        setBlogData(data)
      } else {
        <Redirect to="*" />
      }
    }
    fetchBlog();
  }, [])
  // useEffect(() => {
  //   let data = getPost(id)
  //   console.log(data)
  //   setBlogData(data)
  //   console.log('blog', blogData)
  //   if (!blogData) <Redirect to="*" />
  // }, [id])

  // useEffect(() => {
  //   setBlogData(viewCount(blogData.views, blogData.id))
  // }, [blogData.upvote, blogData.views, blogData.downvote, blogData])

  return (
    <div>
       <Navbar />
      Id of the blog is {id} <br />
      {/* <button value={blogData.data.upvote} onClick={handleUpvote}><img src="../components/upvote.png" alt=""/> {blogData.data.upvote}</button> */}
      {/* <button value={blogData.data.downvote} onClick={handleDownvote}>Downvote: {blogData.data.downvote}</button>  */}
      {/* {JSON.stringify(blogData.data)} */}
    </div>
  )
}

export default Blog