import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

const DynamicSignup = ({isLoggedIn}) => {
  const {pathname} = useLocation()
  const history = useHistory()

  const handleSignout = () => {
    localStorage.clear()
    history.push('/')
  }
  if (isLoggedIn) {
    return (
    <>
      <li className={pathname==="/create"? "active": ""}><Link to="/create"><span className="glyphicon glyphicon-pencil"></span> New Blog</Link></li>
      <li className={pathname==="/signout"? "active": ""} onClick={handleSignout}><Link to="/signout"><span className="glyphicon glyphicon-log-in"></span> Signout</Link></li>
    </>)
  } else {
      return <>
        <li className={pathname==="/signup"? "active": ""}><Link to="/signup"><span className="glyphicon glyphicon-user"></span>Signup</Link></li>
        <li className={pathname==="/signin"? "active": ""}><Link to="/signin"><span className="glyphicon glyphicon-log-in"></span> Signin</Link></li>
      </>
  }
}

function Navbar() {
  const {pathname} = useLocation()
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="#">Fauna Blog</Link>
        </div>
        <ul style={{display:'inline'}} className="nav navbar-nav">
          <li className={pathname==="/"? "active": ""}><Link to="/">Home</Link></li>
          <li className={pathname==="/blogs"? "active": ""}><Link to="/blogs">Blogs</Link></li>
        </ul>
        <ul style={{display:'inline'}} className="nav navbar-nav navbar-right">
          <DynamicSignup isLoggedIn={localStorage.getItem('userId')? true: false} />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;