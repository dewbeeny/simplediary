import { useRef, useState } from "react";
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';



function App() {
  const [data, setdata] = useState([]); //받는 데이터 자체가 배열
 
  const dataId = useRef(0); 

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };
    dataId.current += 1;
    setdata([newItem, ...data]);
  }
  
  const onDelete = (targetId) => {
    const newDiaryList = data.filter(
      (it) => it.id !== targetId //targetId가 아닌 배열을 새로 저장
    );
    setdata(newDiaryList);
  }

  return (
    <div className="App">
     <DiaryEditor onCreate={onCreate} />
     <DiaryList diaryList={data} onDelete={onDelete}/>
    </div>
  );
}

export default App;
