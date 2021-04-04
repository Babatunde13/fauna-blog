// import upvote and downvote icons 
import {/* useHistory, */ useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
// import NotFound from './NotFound'
import {getPost, upvotePost, downvotePost} from '../models'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const Blog = () => {
  let upvote, downvote
  const {id} = useParams()
  const [blogData, setBlogData] = useState({})

  const handleUpvote = async e => {
    upvote = blogData.upvote +1
    let blog = await upvotePost(upvote, id)
    setBlogData(blog)
  }

  const handleDownvote = async e => {
    downvote = blogData.downvote + 1
    let blog = await downvotePost(downvote, id)
    setBlogData(blog)
  }
  // fetch data from the server
  useEffect(() => {
    async function fetchBlog() {
      let data = await getPost(id)
      setBlogData(data)
    }
    fetchBlog();
  }, [id, blogData])
console.log(blogData.author)
  return (
    <div>
       <Navbar />
      <h1>{blogData.title}</h1>
      <span className="text-muted">{blogData.author && `Post by ${blogData.author.username}`} on {blogData.created__at}</span>
      <hr/>
      <div dangerouslySetInnerHTML={{__html: blogData.body}}></div>
      <hr/>
      <div>
        <button 
          onClick={handleUpvote}>
            <FontAwesomeIcon icon={faThumbsUp} />
        </button> {blogData.upvote}
        <span style={{margin: "10px"}}></span>
        <button 
          onClick={handleDownvote}>
           <FontAwesomeIcon icon={faThumbsDown} />
        </button>{blogData.downvote}
      </div>
    </div>
  )
}

export default Blog