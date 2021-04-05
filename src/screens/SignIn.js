import {useRef} from 'react'
import { useHistory } from 'react-router-dom';
import Navbar from "../components/Navbar";
import {loginUser} from '../models'

export default function SignIn() {
  let history = useHistory()
  if (localStorage.getItem('userId')) {
  history.push('/') 
  }
  const email = useRef('')
  const password = useRef('')

  const LoginUser = (e) => {
    e.preventDefault()
    const body = {
      email: email.current.value,
      password: password.current.value
    }
    // Handle login logic
    const user = loginUser(body.email, body.password)
    if (user) {
      localStorage.setItem('userId', user.id)
      localStorage.setItem('username', user.username)
      localStorage.setItem('email', user.email)
      history.push('/')
    } else {
      alert('Invalid email or password')
    }
  }
  return (
   <>
     <Navbar />
     <form className="center form-check">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input style={{maxWidth: '200px'}} ref={email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input ref={password} style={{maxWidth: '200px'}} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <button onClick={LoginUser}  type="submit" class="btn btn-primary">Submit</button>
    </form>
   </>
  )
}