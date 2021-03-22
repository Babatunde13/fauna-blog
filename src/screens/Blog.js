// import upvote and downvote icons 
import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import {getPost, upvotePost, downvotePost, viewCount} from '../models'

const Blog = () => {
  const id = window.location.href.split('/').slice(-1)[0]
  const [blogData, setBlogData] = useState({})
  console.log(blogData)
  console.log(id)

  const handleUpvote = e => {

  }
  // fetch data from the server
  useEffect(() => {
    setBlogData(getPost(id))
    setBlogData(viewCount(blogData.views, blogData.id))
  }, [blogData.views, blogData.id, id])
  const handleClick = e => {
    e.target.value = parseInt(e.target.value)+1
    console.log(e.target.value)
  }
  return (
    <div>
      <Navbar />
      Id of the blog is {id} <br />
      {/* <img src="" alt=""/> */}
      <button value={1} onClick={handleClick}>Hello</button>
    </div>
  )
}

export default Blog