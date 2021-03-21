import {Link} from 'react-router-dom'
// Import upvote and downvote icons


export default function BlogPreview({id, title, author, avatar, upvote, downvote}) {
  return (
    <div>
      <Link to={"/blog/"+id}>
        <img src={avatar} alt={title}/>
        {title}
      </Link>
    </div>
  )
}
