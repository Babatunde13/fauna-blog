import marked from 'marked'

const sampleText = '# Title: Hello\n## Sub-Title: Hi \n### Deeper title \n \n Paragraphs are separated\n by an empty line.\n\n Leave two spaces at the end of a line\n to go to the line.\n\n Attributs: *italic*, **bold**, \n`monospace`, ~~striped~~.\n\n List:\n\n * apples\n * oranges\n * pears\n\n Numbered list:\n\n 1. tofu\n 2. mushrooms\n 3. bread\n\n Link with placeholder text: *[Medium](https://www.medium.com)* \n\n Simple link: https://www.medium.com/ \n\n Code: '+
'```python'+
'\n console.log("Hello folks! I hoped you enjoyed this quick tutorial. Thanks for reading."); \n'+
'``` '

export default function Markdown() {
  const __html = marked(sampleText, { sanitize: true })
  return (
    <div dangerouslySetInnerHTML={{__html}} />
  )
}
