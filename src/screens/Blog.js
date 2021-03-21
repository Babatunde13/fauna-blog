// import upvote and downvote icons 
import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'

const Blog = () => {
  const uri = window.location.href.split('/').slice(-1)[0]
  const [blogData, setBlogData] = useState({})
  console.log(blogData)
  console.log(uri)
  // fetch data from the server
  useEffect(() => {
    setBlogData()
  }, [])
  return (
    <div>
      <Navbar />
      Id of the blog is {uri}
      {/* <img src="" alt=""/> */}
    </div>
  )
}

export default Blog