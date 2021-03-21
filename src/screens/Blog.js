import React from 'react'
import Navbar from '../components/Navbar'

const Blog = ({id, title, author, body, avatar, upvote, downvote}) => {
  const uri = window.location.href.split('/').slice(-1)[0]
  console.log(uri)
  return (
    <div>
      <Navbar />
      Id of the blog is {uri}
    </div>
  )
}

export default Blog