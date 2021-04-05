import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './screens/HomePage'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import NotFound from './screens/NotFound'
import Blog from './screens/Blog'
import CreateBlog from "./screens/CreateBlog";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/blogs/" component={HomePage} />
        <Route path="/blogs/:id/" component={Blog} />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/signup/" component={SignUp} />
        <Route exact path="/create/" component={CreateBlog} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
