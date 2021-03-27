import {useState, useRef} from 'react'
import Navbar from './components/Navbar'
import {createPost} from './models'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 
export default function MarkdownInput() {
  const [content, setContent] = useState('Body of your article goes here...')
  const tags = useRef('')
  const title = useRef('')
  const handleCreate = () => {
    console.log(content, tags.current.value.split(', '), title.current.value)
    createPost(title.current.value, content, '', {name: 'Babatunde'}, tags.current.value.split(','))
    window.location.assign('/')
  }

  return (
    <>
    <Navbar />
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
