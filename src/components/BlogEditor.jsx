import {useEffect,useRef} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
export default function BlogEditor({initial,onChange,onUpload,onError}){
 const host=useRef(null), callbacks=useRef({onChange,onUpload,onError});callbacks.current={onChange,onUpload,onError};
 useEffect(()=>{const parent=host.current;const el=document.createElement('div');parent.appendChild(el);const q=new Quill(el,{theme:'snow',placeholder:'Write your article…',modules:{toolbar:[[{header:[2,3,4,false]}],[{font:[]},{size:[]}],['bold','italic','underline','strike'],[{color:[]},{background:[]}],[{list:'ordered'},{list:'bullet'},{list:'check'}],[{align:[]},{indent:'-1'},{indent:'+1'}],['blockquote','code-block','link','image'],['clean']]}});
 q.clipboard.dangerouslyPasteHTML(DOMPurify.sanitize(initial||''));
 const change=()=>callbacks.current.onChange(q.root.innerHTML);q.on('text-change',change);
 q.getModule('toolbar').addHandler('image',()=>{const input=document.createElement('input');input.type='file';input.accept='image/jpeg,image/png,image/webp';input.onchange=async()=>{if(!input.files?.[0])return;try{const url=await callbacks.current.onUpload(input.files[0]);const range=q.getSelection(true);q.insertEmbed(range?.index??q.getLength()-1,'image',url,'user');}catch(e){callbacks.current.onError(e.message);}};input.click();});
 return()=>{q.off('text-change',change);parent.replaceChildren();};},[]);
 return <div className="cms-editor"><div ref={host}/></div>;
}