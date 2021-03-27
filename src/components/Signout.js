import "../screens/Signin.css";

export default function Signout() {
  const handleClick = () => {
    console.log(JSON.parse(localStorage.getItem('user')))
    localStorage.removeItem('user')
    window.location.assign('/')
  }
  return (
    <div className="signin__input mt-6">
      <button onClick={handleClick}>Sign Out</button>
    </div>
  )
}
