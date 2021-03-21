import BlogPreview from '../components/BlogPreview'
import Navbar from '../components/Navbar';

const blogs = require('../data.json')
 
export default function HomePage() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <Navbar />
      {/* </header> */}
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
