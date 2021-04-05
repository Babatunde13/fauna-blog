import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'


export default function BlogPreview({id, title, author, avatar, upvote, downvote}) {

  return (
    <div className="col-md-4 col-sm-6 card" style={{maxWidth: '380px', margin: '15px'}}>
      <img className="card-img-top" src={avatar} alt=""/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Post created by {author.username}</p>
        <div>
        <button onClick={() => {alert('View this blog to upvote it')}}>
            <FontAwesomeIcon icon={faThumbsUp} />
        </button> {upvote}
        <span style={{margin: "10px"}}></span>
        <button onClick={() => {alert('View this blog to downvote it')}}>
           <FontAwesomeIcon icon={faThumbsDown} />
        </button>{downvote}
      </div>
        <Link to={`/blogs/${id}`} className="btn btn-primary">Read blog</Link>
      </div>
    </div>
  )
}
