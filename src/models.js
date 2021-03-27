import faunadb, {query as q} from 'faunadb'
import bcrypt from 'bcryptjs'
import {v4} from 'uuid'
import dotenv from 'dotenv'

dotenv.config()
// process.env.REACT_APP_FAUNA_KEY
const client = new faunadb.Client({secret: 'fnAEFOklEzACBUr_aud8cXBZsZOkyq_2jhgxd3Bx'})

export  const createUser = (name, email, username, password) => {
  let data = client.query(
    q.Create(
      q.Collection('users'),
      {
        data: {
          name, 
          email, 
          username, 
          password,
          id: v4()
        }
      }
    )
  )
  return data.data
}

export const loginUser = (email, password) => {
  let user 
  try {
    client.query(
      q.Get(
        q.Match(q.Index('user_by_email'), email)
      )
    ).then(
      res => {
        console.log(res)
        user = res.data
        console.log(user)
      }
    )
    if (bcrypt.compareSync(password, user.password)) return user
    else return
  } catch (error) {
    console.error(error)
    return
  }
}

export const createPost = (title, body, avatar, author, tags) => {
  let data = client.query(
    q.Create(
      q.Collection('blogs'),
      {
        data: {
          title, 
          body, 
          upvote: 0,
          downvote: 0,
          views: 0,
          author,
          avatar,
          tags
        }
      }
    )
  )
  data.data.id = data.Ref.id
  return data.data
}

export const getPosts = async () => {
  let allBlogs = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("blogs"))),
      q.Lambda("X", q.Get(q.Var("X")))
    )
  )
  return allBlogs.data
}

export const getPost = async id => {
  let blog = await client.query(
    q.Get(q.Ref(q.Collection('blogs'), id))
  )
  return blog.data
}

export const upvotePost = (upvote, id) => {
  let blog
  client.query(
    q.Update(
      q.Ref(q.Collection('blogs'), id),
      {data: {upvote}}
    )
  )
  .then(res => {
    console.log(res)
    blog = res.data
  })
  return blog
}

export const downvotePost = (downvote, id) => {
  let blog
  client.query(
    q.Update(
      q.Ref(q.Collection('blog'), id),
      {data: {downvote}}
    )
  )
  .then(res => {
    console.log(res)
    blog = res.data
  })
  return blog
}

export const viewCount = (views, id) => {
  let blog
  client.query(
    q.Update(
      q.Ref(q.Collection('blog'), id),
      {data: {views}}
    )
  )
  .then(res => {
    console.log(res)
    blog = res.data
  })
  return blog
}

// getPosts()