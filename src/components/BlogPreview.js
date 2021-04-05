import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'


export default function BlogPreview({id, title, author, avatar, upvote, downvote}) {

  return (
    <div class="col-md-4 col-sm-6 card" style={{width: '18rem', padding: '20px'}}>
      <img class="card-img-top" src={avatar} alt=""/>
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">Post created by {author.username}</p>
        <div>
        <button onClick={() => {alert('View this blog to upvote it')}}>
            <FontAwesomeIcon icon={faThumbsUp} />
        </button> {upvote}
        <span style={{margin: "10px"}}></span>
        <button onClick={() => {alert('View this blog to downvote it')}}>
           <FontAwesomeIcon icon={faThumbsDown} />
        </button>{downvote}
      </div>
        <Link to={`/blogs/${id}`} class="btn btn-primary">Read blog</Link>
      </div>
    </div>
  )
}
