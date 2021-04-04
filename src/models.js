import faunadb, {query as q} from 'faunadb'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()
const client = new faunadb.Client({secret: process.env.REACT_APP_FAUNA_KEY})

export  const createUser = async (name, email, username, password) => {
  password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  let data
  try {
    data= await client.query(
      q.Create(
        q.Collection('users'),
        {
          data: {
            name, 
            email, 
            username, 
            password
          }
        }
      )
    )
    if (data.name === 'BadRequest') return
  } catch (error) {
    console.log(error)
    return 
  }
  const user = data.data
  user.id = data.ref.value.id
  return user
}

export const getUser = async (userId) => {
  try {
    const user = await client.query(
      q.Get(
        q.Ref(q.Collection('users'), userId)
      )
    )
    return user.data
  } catch {
    return
  }
}

export const loginUser = async (email, password) => {
  let userData = await client.query(
    q.Get(
      q.Match(q.Index('user_by_email'), email)
    )
  )
  if (userData.name && userData.name == "NotFound") return
  user = userData.data
  user.id = userData.ref.value.id
  if (bcrypt.compareSync(password, user.password)) return user
  else return
}

export const createPost = async (title, body, avatar, authorId, tags) => {
  let author = await getUser(authorId)
  console.log(author)
  let data = await client.query(
    q.Create(
      q.Collection('blogs'),
      {
        data: {
          title, 
          body, 
          upvote: 0,
          downvote: 0,
          author: {
            name:author.name, 
            email: author.email, 
            id:author.id, 
            username: author.username
          },
          avatar,
          tags
        }
      }
    )
  )
  console.log(data)
  data.data.id = data.ref.value.id
  if (author.blogIds) {
    client.query(
      q.Update(
        q.Ref(q.Collection('users'), authorId), 
        {data: {blogIds: [data.data.id, ...author.blogIds]}}
      )
    )
  } else {
    client.query(
      q.Update(
        q.Ref(q.Collection('users'), authorId), 
        {data: {blogIds: [data.data.id]}}
      )
    )
  }
  data.data.id = data.ref.value.id
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
  blog.data.id = blog.ref.value.id
  return blog.data
}

export const upvotePost = async (upvote, id) => {
  let blog = await client.query(
    q.Update(
      q.Ref(q.Collection('blogs'), id),
      {data: {upvote}}
    )
  )
  blog.data.id = blog.ref.value.id
  return blog.data
}

export const downvotePost = async (downvote, id) => {
  let blog = await client.query(
      q.Update(
        q.Ref(q.Collection('blogs'), id),
        {data: {downvote}}
      )
    )
  blog.data.id = blog.ref.value.id
  return blog.data
}