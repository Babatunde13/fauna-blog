import {useRef} from 'react'
import Navbar from "../components/Navbar";
import { createUser } from '../models';
import {useHistory} from 'react-router-dom'

export default function SignIn() {
  const history = useHistory()
  if (localStorage.getItem('user')) {
    history.push('/')
  }
  const name= useRef()
  const email = useRef()
  const password = useRef()
  const username = useRef()
  const confirm_password = useRef()
  const LoginUser = async (e) => {
    e.preventDefault()
    const body = {
      email: email.current.value,
      name: name.current.value,
      username: username.current.value,
      password: password.current.value
    }
    if (body.name && body.password && body.email && body.username && body.password === confirm_password.current.value) {
      const user = await createUser(body.name, body.email, body.username, body.password)
      if (!user) {
        alert('Email has been chosen')
      } else {
        localStorage.setItem('userId', user.id)
        localStorage.setItem('username', user.username)
        localStorage.setItem('email', user.email)
        history.push('/')
        alert('Account created sucessfully, signing you in...')
      }
    } else if (!name || !email || !username || !password) {
      alert('You didn\'t pass any value')
    } else {
      alert('Password and confirm password fields must be equal')
    }

    console.log(body)
  }
  
  return (
    <>
      <Navbar />
      <form className="center form-check">
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input style={{maxWidth: '200px'}} ref={name} type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Name" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input style={{maxWidth: '200px'}} ref={email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input ref={username} style={{maxWidth: '200px'}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input ref={password} style={{maxWidth: '200px'}} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input ref={confirm_password} style={{maxWidth: '200px'}} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button onClick={LoginUser}  type="submit" class="btn btn-primary">Submit</button>
    </form>
    </>
  )
}