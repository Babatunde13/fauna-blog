import {useState, useRef} from 'react'
import Navbar from './components/Navbar'
import {createPost} from './models'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useHistory} from 'react-router-dom'
 
export default function MarkdownInput() {
  const history = useHistory()
  const [content, setContent] = useState('Body of your article goes here...')
  const tags = useRef('')
  const title = useRef('')
  const handleCreate = async () => {
    await createPost(title.current.value, content, '', localStorage.getItem('userId'), tags.current.value.split(','))
    alert('Blog post created successfully, signing you in...')
    history.push('/')
  }

  return (
    <>
    <Navbar />
      <div className="form-group">
        <label htmlFor="upload">Upload avatar</label>
        <input type="file" name="" id="" onChange={e => {console.log(e.target.files[0])}}/>
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input className="form-control form-control-lg" ref={title} type="text" name="title" id=""/>
      </div>
      <div>
        <label htmlFor="tags">Tags</label>
        <input className="form-control form-control-lg" ref={tags} type="text"  />
      </div>
    <div className="form-group">
      <h2>Body Of Your Post</h2>
      <CKEditor
      className="form-control-lg form-control h-100"
        editor={ ClassicEditor }
        data={content}
        row={100}
        onReady={ editor => {
            // You can store the "editor" and use when it is needed.
        } }
        onChange={ ( event, editor ) => {
            const data = editor.getData();
            setContent(data)
        } }
      />
    </div>
    <button className="btn btn-primary w-30" onClick={handleCreate}>Post</button>
    </>
  )
}
