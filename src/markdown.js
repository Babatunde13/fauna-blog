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
    console.log(content, tags.current.value.split(', '), title.current.value)
    await createPost(title.current.value, content, '', localStorage.getItem('userId'), tags.current.value.split(','))
    history.push('/')
  }

  return (
    <>
    <Navbar />
      <div>
        <label htmlFor="upload">Upload avatar</label>
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input style={{border: '1px solid black'}} ref={title} type="text" name="title" id=""/>
      </div>
      <div>
        <label htmlFor="tags">Tags</label>
        <input style={{border: '1px solid black'}} ref={tags} type="text"  />
      </div>
    <div className="App">
      <h2>Body Of Your Post</h2>
      <CKEditor
        height="100"
        editor={ ClassicEditor }
        data={content}
        onReady={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event, editor ) => {
          
            const data = editor.getData();
            console.log(event)
            console.log(editor)
            console.log(data);
            setContent(data)
        } }
      />
    </div>
    <button onClick={handleCreate}>Post</button>
    </>
  )
}
