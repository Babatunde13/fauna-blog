import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
// import Logo from "../../assets/svgs/Vector.svg";

const DynamicSignup = ({isLoggedIn}) => {
  const handleSignout = () => {
    window.localStorage.removeItem('user')
    window.location.assign('/')
  }
  if (isLoggedIn) {
    return <Link to="/signout" className="navbar__btn">
      <span className="navbar__btn" onClick={handleSignout}>
        Signout
      </span>
    </Link>
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
          {/* <img src={Logo} alt="Logo" /> */}
          <h2 className="navbar__title">
            Fauna Blog
          </h2>
        </Link>
      </div>
      <div className="navbar__right">
        <Link to="/blogs">
          Blogs
        </Link>
        <DynamicSignup isLoggedIn={localStorage.getItem('user')} />
      </div>
    </div>
  );
}

export default Navbar;