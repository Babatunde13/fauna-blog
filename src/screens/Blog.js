// import upvote and downvote icons 
import {/* useHistory, */ useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
// import NotFound from './NotFound'
import {getPost, upvotePost, downvotePost} from '../models'

const Blog = () => {
  let upvote, downvote
  const {id} = useParams()
  const [blogData, setBlogData] = useState({})

  const handleUpvote = e => {
    upvote = blogData.upvote +1
    upvotePost(upvote, id)
  }

  const handleDownvote = e => {
    downvote = blogData.downvote + 1
    downvotePost(downvote, id)
  }
  // fetch data from the server
  useEffect(() => {
    async function fetchBlog() {
      // You can await here
      let data = await getPost(id)
      console.log('DaFa', data)
      setBlogData(data)
    }
    fetchBlog();
  }, [upvote, downvote])

  return (
    <div>
       <Navbar />
      <h1>{blogData.title}</h1>
      <hr/>
      <div dangerouslySetInnerHTML={{__html: blogData.body}}></div>
      <hr/>
      <div>
        <button 
          onClick={handleUpvote}>
            <img src="../components/upvote.png" alt="upvote"/>
        </button>{blogData.upvote}
        <button 
          onClick={handleDownvote}>
            <img src="../components/downvote.png" alt="downvote"/>
        </button> {blogData.downvote}
      </div>
    </div>
  )
}

export default Blog