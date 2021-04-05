import React from "react";
import { Link, useHistory } from "react-router-dom";

const DynamicSignup = ({isLoggedIn}) => {
  const history = useHistory()

  const handleSignout = () => {
    localStorage.clear()
    history.push('/')
  }
  if (isLoggedIn) {
    return (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/create">New Post</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signout" onClick={handleSignout}>Signout</Link>
      </li>
    </>)
  } else {
      return <>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signin">Signin</Link>
        </li>
      </>
  }
}

function Navbar() {
  return (
    <nav className="avbar navbar-light bg-light justify-content-between">
      <span className="navbar-brand" to="/">Fauna Blog</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto inline">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/blogs/">Blogs <span className="sr-only">(current)</span></Link>
          </li>
          <DynamicSignup isLoggedIn={localStorage.getItem('userId')? true: false} />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;