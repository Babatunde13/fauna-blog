import faunadb, {query as q} from 'faunadb'
import bcrypt from 'bcryptjs'
import { use } from 'marked'
const client = new faunadb.Client({secret: ''})

const createUser = (name, email, username, password) => {
  let data = client.query(
    q.Create(
      q.Collection('users'),
      {
        data: {
          name, 
          email, 
          username, 
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        }
      }
    )
  )
  data.data.id = data.ref.id()
  return data.data
}

const loginUser = (email, password) => {
  let user 
  client.query(
    q.Get(
      q.Match(q.Index('users_by_email'), email)
    )
  ).then(
    res => {
      res.data.id = res.ref.id()
      user = res.user
    }
  )
  if (bcrypt.compareSync(password, user.data.password)) {
    return user
  }
}

const createPost = (title, body, upvote, downvote, author) => {

}

module.exports = {
  createUser, loginUser
}