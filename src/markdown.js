import {useState, useRef} from 'react'
import {createPost} from './models'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useHistory} from 'react-router-dom'
 
export default function MarkdownInput() {
  const history = useHistory()
  const [content, setContent] = useState('<h2>Body of your article goes here...</h2>')
  const tags = useRef('')
  const title = useRef('')
  const handleCreate = async () => {
    await createPost(title.current.value, content, '', localStorage.getItem('userId'), tags.current.value.split(','))
    alert('Blog post created successfully, signing you in...')
    history.push('/')
  }

  return (
    <form className="form-horizontal">
      <div className="form-group">
        <label className="control-label col-sm-4" htmlFor="upload">Upload avatar</label>
        <input type="file"className="form-control mx-md-3 col-sm-4" id="" onChange={e => {console.log(e.target.files[0])}}/>
      </div>
      <div className="form-group">
        <label className="control-label col-sm-4" htmlFor="title">Title</label>
        <input className="form-control mx-md-3 col-sm-4" ref={title} type="text" name="title" id=""/>
      </div>
      <div>
        <label className="control-label col-sm-4" htmlFor="tags">Tags</label>
        <input className="form-control mx-md-3 col-sm-4" ref={tags} type="text"  />
        <div className="col-sm-4"></div>
      </div>
      <br/><br/><br/>
      <div className="form-group">
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
    <div className="form-group">
        <div className="col-sm-5"></div>
        <button onClick={handleCreate}  type="submit" className="btn btn-primary col-sm-2">Submit</button>
      </div>
    </form>
  )
}
