import faunadb, {query as q} from 'faunadb'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()
// process.env.REACT_APP_FAUNA_KEY
const client = new faunadb.Client({secret: 'fnAEFOklEzACBUr_aud8cXBZsZOkyq_2jhgxd3Bx'})

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

export const loginUser = (email, password) => {
  let user 
  try {
    client.query(
      q.Get(
        q.Match(q.Index('user_by_email'), email)
      )
    ).then(res => {
        user = res.data
        if (user.name === 'NotFound') return
        else if (bcrypt.compareSync(password, user.password)) {
          user.id = res.ref.value.id 
        } 
        else return
      })
  } catch (error) {
    console.log(error)
    return
  }
  return user
}

export const createPost = async (title, body, avatar, authorId, tags) => {
  let author = await getUser(authorId)
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
  data.data.id = data.Ref.value.id
  if (author.blogIds) {
    client.query(
      q.Update(
        q.Ref(q.Collection('users'), authorId), 
        {data: [...author.blogIds, data.data.id]}
      )
    )
  } else {
    client.query(
      q.Update(
        q.Ref(q.Collection('users'), authorId), 
        {data: [data.data.id]}
      )
    )
  }
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