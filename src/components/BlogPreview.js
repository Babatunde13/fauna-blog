import {Link} from 'react-router-dom'
// Import upvote and downvote icons


export default function BlogPreview({id, title, author, avatar, upvote, downvote}) {
  return (
    <div>
      <Link to={"/blogs/"+id}>
        <img src={avatar} alt={title}/>
        {title} <br/>
        Post created by {author.username}
      </Link>
    </div>
  )
}
