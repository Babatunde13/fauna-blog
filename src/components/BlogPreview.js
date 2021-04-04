import {Link} from 'react-router-dom'
// Import upvote and downvote icons


export default function BlogPreview({id, title, author, avatar, upvote, downvote}) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6" >
      <Link to={"/blogs/"+id}>
        <img src={avatar} alt={title} style={{maxHeight: '120px', minWidth: '300px'}}/>
      </Link>
      <h1>{title}</h1> <br/>
      <span className="text-muted">Post created by {author.username}</span>
    </div>
  )
}
