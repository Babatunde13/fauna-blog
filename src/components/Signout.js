import "../screens/Signin.css";

export default function Signout() {
  const handleClick = () => {
    window.localStorage.removeItem('user')
    window.location.assign('/')
  }
  return (
    <div className="signin__input mt-6">
      <button onClick={handleClick}>Sign Out</button>
    </div>
  )
}
