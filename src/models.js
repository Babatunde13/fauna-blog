import faunadb, {query as q} from 'faunadb'
import bcrypt from 'bcryptjs'

const client = new faunadb.Client({secret: 'fnAEE4MzScACB_lcbBM3VSZvjziecYEDHbtgcoDA'})

export const createUser = (name, email, username, password) => {
  let data = client.query(
    q.Create(
      q.Collection('users'),
      {
        data: {
          name, 
          email, 
          username, 
          password: bcrypt.hashSync(password)
        }
      }
    )
  )
  data.data.id = data.ref.id()
  return data.data
}

export const loginUser = (email, password) => {
  let user 
  client.query(
    q.Get(
      q.Match(q.Index('users_by_email'), email)
    )
  ).then(
    res => {
      res.data.id = res.ref.id()
      user = res.data
    }
  )
  if (bcrypt.compareSync(password, user.data.password)) {
    return user
  }
}

export const createPost = (title, body, avatar, upvote, downvote, views, author) => {
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
          avatar
        }
      }
    )
  )
  data.data.id = data.ref.id()
  return data.data
}

export const getPost = id => {
  let blog
  client.query(
    q.Get(q.Ref(q.Collection('blog'), id))
  )
  .then(res => {
    console.log(res)
    res.data.id = res.ref.id()
    blog = res.data
  })
  return blog
}

export const upvotePost = (upvote, id) => {
  let blog
  client.query(
    q.Update(
      q.Ref(q.Collection('blog'), id),
      {data: {upvote}}
    )
  )
  .then(res => {
    console.log(res)
    res.data.id = res.ref.id()
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
    res.data.id = res.ref.id()
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
    res.data.id = res.ref.id()
    blog = res.data
  })
  return blog
}