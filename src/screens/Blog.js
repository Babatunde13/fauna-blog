// import upvote and downvote icons 
import {/* useHistory, */ useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import NotFound from './NotFound'
import {getPost /*, upvotePost, downvotePost, viewCount*/} from '../models'

const Blog = () => {
  const {id} = useParams()
  const [blogData, setBlogData] = useState({})

  // const handleUpvote = e => {
  //   blogData.upvote += 1
  //   upvotePost(blogData.upvotePost, id)
  // }

  // const handleDownvote = e => {
  //   blogData.downvote += 1
  //   downvotePost(blogData.upvote, id)
  // }
  // fetch data from the server
  useEffect(() => {
    async function fetchBlog() {
      // You can await here
      let data = await getPost(id)
      console.log('DaFa', data)
      if (data.requestResult && data.requestResult.statusCode === 404) {
        setBlogData(data)
      } else {
        return <NotFound />
      }
    }
    fetchBlog();
  }, [id])
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
      {/* <button value={blogData.upvote} onClick={handleUpvote}><img src="../components/upvote.png" alt=""/> {blogData.data.upvote}</button> */}
      {/* <button value={blogData..downvote} onClick={handleDownvote}>Downvote: {blogData.data.downvote}</button>  */}
      <h1>{blogData.title}</h1>
      <div dangrouslySetInnerHTML={{__html: blogData.body}}></div>
       <button>{blogData.upvote}</button>
        <button>{blogData.downvote}</button>
    </div>
  )
}

export default Blog