import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function AddText() {
  const editorRef = useRef<object|any>(null);
  const log = () => {
    if (editorRef.current) {

      const htmlString=editorRef.current.getContent();
      const htmlElement=document.createElement('div');

      htmlElement.classList.add('text-item')
      htmlElement.style.position='absolute';
      htmlElement.style.top='0';
      htmlElement.style.left='0';
      htmlElement.style.userSelect='none';
      htmlElement.style.backgroundColor='rgba(255,255,255,0)';
      htmlElement.style.zIndex='-2';
      htmlElement.style.width='100%';

      htmlElement.addEventListener('mousedown',()=>{
        htmlElement.classList.add('drag');
        htmlElement.style.border='1px dotted rgb(29 78 216)';
      })
      

      htmlElement.innerHTML = htmlString;
      const canva= document.getElementById('canva');
      canva?canva.appendChild(htmlElement):null;

    }
  };
  return (
    <div>
        <div className='absolute left-[22%] bottom-0 hidden tmce z-20'>
        <Editor
            apiKey='3x7rrxxavwlo4wu9kwpj05bbt10s4l8qracmg6wzl5reey9e'
            id="1"
            onInit={(evt, editor) => editorRef.current = editor}
            // initialValue="<p>This is the initial content of the editor.</p>"
            init={{
            height: 300,
            width:700,
            menubar: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | fontfamily fontsize | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright' ,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color: black;}',
            skin: 'oxide-dark',
            content_css: 'dark',
            statusbar: false,
            }}
        />
        <button className=' text-white h-6 flex bg-blue-700 rounded-sm w-[110px] justify-center font-thin hover:bg-blue-800 addtext2' onClick={log}>Add Text</button>
        </div>
    </div>
  );
  
}