import BlogPreview from '../components/BlogPreview'
import Navbar from '../components/Navbar';
import {getPosts} from '../models'

console.log(getPosts())

const blogs = getPosts() || require('../data.json')
 
export default function HomePage() {
  return (
    <div className="App">
        <Navbar />
      {console.log(localStorage.getItem('user'))}
      {
      //  localStorage.getItem('user') ?
      //   <div>Hey {JSON.parse(localStorage.getItem('user')).username} 👋</div> :
        <div>Hey there! 👋</div>
      }
      <div className="grid grid-rows-2 md:grid-rows-6 ">
        {blogs.map(ele => 
          <BlogPreview 
            key={ele.id}
            id={ele.id}
            title={ele.title}
            author={ele.author}
            avatar={ele.avatar}
            upvote={ele.upvote}
            downvote={ele.downvote}/>
        )}
      </div>
    </div>
  );
}
