import './App.css';
import React, { useRef, useState } from "react";


const DiaryEditor = ({ onCreate }) => {

  const authorInput = useRef();
  const contentInput = useRef();

    const[state, setstate] = useState(
        {
            author:" ",
            content:" ",
            emotion:1,
        }
    )

const handleChangeState = (e) => {
   setstate({
    ...state,
    [e.target.name]: e.target.value,
   });
}

const handleSubmit = ()=> {
if(state.author.length < 1){
  authorInput.current.focus();
  return;
}
if(state.content.length < 5){
  contentInput.current.focus();
  return;
  }

 onCreate(state.author, state.content, state.emotion);
  alert("저장되었습니다.");
}

return(
<div className="DiarytEditor">
    <h2>오늘의 일기</h2>
    <div>
    <input
    ref={authorInput}
    name ="author"
    value={state.author}
    onChange={handleChangeState}></input>
    </div>
  <div>
  <textarea
  ref={contentInput}
    name="content"
    value={state.content}
    onChange={handleChangeState}></textarea>
  </div>
  <div>
    오늘의 감정 점수 : 
    <select
    name="emotion"
    value={state.emotion}
    onChange={handleChangeState}>

        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
    </select>
  </div>
  <div>
    <button onClick={handleSubmit}>일기 저장하기</button>
  </div>
</div>
);
};

export default React.memo(DiaryEditor);