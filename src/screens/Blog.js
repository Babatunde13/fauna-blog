// import upvote and downvote icons 
import {Redirect} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import {getPost, upvotePost, downvotePost, viewCount} from '../models'

const Blog = () => {
  const id = window.location.href.split('/').slice(-1)[0]
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
    setBlogData(getPost(id))
    console.log(blogData)
    if (!blogData) <Redirect to="/" />
  }, [id, blogData])

  // useEffect(() => {
  //   setBlogData(viewCount(blogData.views, blogData.id))
  // }, [blogData.upvote, blogData.views, blogData.downvote, blogData])

  return (
    <div>
      {/* <Navbar />
      Id of the blog is {id} <br />
      <button value={blogData.upvote} onClick={handleUpvote}><img src="../components/upvote.png" alt=""/> {blogData.upvote}</button>
      <button value={blogData.downvote} onClick={handleDownvote}>Downvote: {blogData.downvote}</button> */}
      {JSON.stringify(blogData)}
    </div>
  )
}

export default Blog