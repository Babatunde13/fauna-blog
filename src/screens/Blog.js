import React from 'react'
import Navbar from '../components/Navbar'

export default function Blog({id, title, author, }) {
  const uri = window.location.href.split('/').slice(-1)[0]
  console.log(uri)
  return (
    <div>
      <Navbar />
      Id of the blog is {uri}
    </div>
  )
}
