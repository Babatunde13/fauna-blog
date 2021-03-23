import faunadb, {query as q} from 'faunadb'
import bcrypt from 'bcryptjs'
import {v4} from 'uuid'

const client = new faunadb.Client({secret: 'fnAEE4MzScACB_lcbBM3VSZvjziecYEDHbtgcoDA'})

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
          id: v4(),
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
  return data.data
}

export const getPosts = () => {
  let blog
  try {
    client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('blogs'))),
        q.Lambda(x => q.Get(x))
      )
    ).then(res => {
      blog = res.data
    })
  } catch (error) {
    console.error(error)
  }
  return blog
}

export const getPost = id => {
  let blog
  client.query(
    q.Get(q.Ref(q.Collection('blogs'), id))
  )
  .then(res => {
    console.log(res)
    res.data.id = JSON.stringify(res.ref)['@ref'].id
    blog = res.data
  })
  return blog
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