import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const DynamicSignup = ({isLoggedIn}) => {
  const handleCreateBtn = () => {
    
  }

  const handleSignout = () => {
    window.localStorage.removeItem('user')
    window.location.assign('/')
  }
  if (isLoggedIn) {
    return (
    <>
      <Link to="/create" className="navbar__btn" style={{width: '50px', height: '40px', marginRight:'10px'}}>
        <span className="navbar__btn" onClick={handleCreateBtn}>
          New Post
        </span>
      </Link>
      <Link to="/signout" className="navbar__btn" style={{width: '50px', height: '40px', marginRight:'10px'}}>
        <span className="navbar__btn" onClick={handleSignout}>
          Signout
        </span>
    </Link>
    </>)
  } else {
      return <>
        <Link to="/signup" className="navbar__btn" style={{width: '50px', height: '40px', marginRight:'10px'}}>
          <span className="navbar__btn">
            Register
          </span>
      </Link> 
      <Link to="/signin" className="navbar__btn" style={{width: '50px', height: '40px', marginLeft: '10px'}}>
        <span className="navbar__btn">
          Login
        </span>
      </Link> 
      </>
  }
}

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__left">
          <h2 className="navbar__title">
            Fauna Blog
          </h2>
        </Link>
      </div>
      <div className="navbar__right">
        <Link to="/blogs" className="navbar__btn" style={{width: '50px', height: '40px', marginRight:'10px'}}>
          <span className="navbar__btn">
            Blogs
          </span>
        </Link>
        <DynamicSignup isLoggedIn={localStorage.getItem('user')} />
      </div>
    </div>
  );
}

export default Navbar;