import { useHistory } from "react-router";
import "../screens/Signin.css";

export default function Signout() {
  const history = useHistory()
  const handleClick = () => {
    localStorage.clear()
    history.push('/')
  }
  return (
    <div className="signin__input mt-6">
      <button onClick={handleClick}>Sign Out</button>
    </div>
  )
}
