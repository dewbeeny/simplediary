import { useCallback, useMemo, useEffect, useRef, useState } from "react";
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';



function App() {
  const [data, setdata] = useState([]); //받는 데이터 자체가 배열
 
  const dataId = useRef(0); 



  const getData = async () => {
    const res = await fetch(
      "https:jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
   
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime() + 1,
        id: dataId.current++
      };
    });
 setdata(initData);
  };

  useEffect(() =>
  {getData()}, [])

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };
    dataId.current += 1;
    setdata((data) => [newItem, ...data]);
  },[]//바로 setdata ([newItem, ...data]) 해버리면 data 값이 바뀔 때마다 다시 랜더링 해야하는데 이러면 의미가 없음.
  );
  
  const onDelete = (targetId) => {
    const newDiaryList = data.filter(
      (it) => it.id !== targetId //targetId가 아닌 배열을 새로 저장
    );
    setdata(newDiaryList);
  }

  const onEdit = (targetId, newContent) => {
    setdata(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  
 //map으로 순회하면서 해당 배열이 타겟 아이디랑 같을 경우 컨텐츠 제외 모두 복사 후 컨텐츠만 변경

   const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }
     
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
  
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
     <DiaryList onEdit={onEdit} diaryList={data} onDelete={onDelete}/>
    </div>
  );
}

export default App;
