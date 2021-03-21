import "tailwindcss/dist/tailwind.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './screens/HomePage'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import NotFound from './screens/NotFound'
import Blog from './screens/Blog'
import Markdown from "./markdown";
import './App.css'

const blogs = require('./data.json')
console.log(blogs)

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/blogs" component={HomePage} />
      <Route path="/blog/:id" component={Blog} />
      <Route exact path="/signin/" component={SignIn} />
      <Route exact path="/signup/" component={SignUp} />
      <Route exact path="/markdown/" component={Markdown} />
      <Route exact path="/signout/" />
      <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
