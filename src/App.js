// import Button from "./Button";
// import styles from "./App.module.css"; //해당 js에 import 한다
// //<h1>에서 classnamed은 기억할 필요가 없이 무작위로 할당돼서 좋다
// function App() {
//   return (
//     <div>
//       <h1 classname={styles.title}>Welcome back!!</h1>
//       <Button text={"Continue"}/>
//     </div>
//   );
// }



// export default App;

// render 될 때 특정 코드만 실행되길 원하는 경우 effect를 사용하는 거 같다
//----------------------------------스타일 모듈화하는 법-----------------------------------------------------------

// import { useState, useEffect } from "react";

// function App() {
//   const [counter, setValue] = useState(0); // useSate를 적으면 알아서 import 해줌
//   const [keyword, setKeyword] = useState("");
//   const onClick = () => setValue((prev) => prev + 1);
//   const onChange = (event) => setKeyword(event.target.value);
//   useEffect(() => {
//     console.log("I run only one.");
//   }, []);
//   useEffect(() => { //여기에 if를 하고 두번째요소 [keyword] 전까지 묶으면 조건을 더 추가할 수 있다.
//     console.log("I run when 'keyword' changes.");
//   }, [keyword]);//두번째 []안에 있는 값이 변할 때 마다 첫번째 요소를 실행하라고 알려주는 것 그래서 위에는 지켜볼 게 없으므로 한 번만 실행된다.
// []는 컴포넌트가 생성될때 첫번째 요소가 실행되는 것이다.
//   useEffect(() => {
//     console.log("I run when 'counter' one.");
//   }, [counter]); //카운터가 변할 때 출력됨
//   useEffect(() => {
//     console.log("I run when 'keyword'  & 'counter' one.");
//   }, [keyword, counter]); //키워드나 카운터가 변할 때 출력됨
//   return (
//     <div>
//       <input
//         value={keyword}
//         onChange={onChange}
//         type="text"
//         placeholder="Search one.."
//       />
//       <h1>{counter}</h1>
//       <button onClick={onClick}>Click me!</button>
//     </div>
//   );
// }

// export default App;
// --------------------------------------------------------useEffect 쓰는 법-----------------------------------------------------------------------
// function Hello() {
//   useEffect(() => {
//     console.log("created :)");
//     return() => console.log("destoryed :(");
//   }, []);
//   return <h1>Hello</h1>;
// }
// function Hello() {
//   function byFn() {
//     console.log("destoryed");
//   }
//   function hiFn(){
//     console.log("created");
//     return byFn; //destoryed를 원하면 여기에 만들어야 함 위 주석이랑 같게 만들어야 함 그냥 return를 붙이면 destoryed 됐던걸 부를 수 있는듯
//   }
//   useEffect(hiFn, []); // hiFn 함수가 호출된 이후로는 변화없음
//   return <h1>Hello</h1>;
// }
// ----------------------clean up 강의 리액트 영화 웹페이지 6번 강의--------------------------------------------
// 함수는 () => {} 이런 형태
// function Hello() {
//   useEffect(() => {
//     console.log("created :)");
//     return () => console.log("destoryed :(");
//   }, []); // hiFn 함수가 호출된 이후로는 변화없음
//   return <h1>Hello</h1>;
// }

// function App() {
//   const [showing, setShowing] = useState(false);
//   const onClick = () => setShowing((prev) => !prev);
//   return (
//     <div>
//       {showing ? <Hello /> : null}
//       <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
//     </div>
//   )
// }

// export default App;

// // 근데 이거 왜 중복해서 뜰까? 결과가?
//------------------------------리액트로 toDOList만드는 과정------------------------------------------------------
// function App() {
//   const [toDo, setToDo] = useState("");
//   const [toDos, setToDos] = useState([]);
//   const onChange = (event) => setToDo(event.target.value);
//   const onSubmit = (event) => {
//     event.preventDefault();
//     if (toDo === "") {
//       return;
//     }
//     //toDo에 아무것도 없으면 리턴하지 않는다.
//     setToDos((currentArray) => [toDo, ...currentArray]); //...은 기존요소가 있는 리스트에 자연스럽게 추가해주는 기능을 한다. ...를 쓰지않으면 [toDo, Array()] 이런식으로 된다.
//     setToDo(""); //submit시 받은 값을 ""로 만든다. toDo = ""를 하지 않는 이유는 직접 state를 수정하지않고 수정하는 함수를 쓴다( ToDos.push도 하지 않는다)
//   };
//   console.log(toDos);
//   return (
//     <div>
//       <h1>My To Do ({toDos.length})</h1>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={toDo}
//           type="text"
//           placeholder="Write your to do"
//         />
//         <button>Add To Do</button>
//       </form>
//       <hr />
//       <ul>
//         {toDos.map((toDo, index) => (
//           <li key={index}>{toDo}</li>
//         ))}
//       </ul>
//     </div> //map은 함수의 첫번째 argument로 현재의 item을 가져올 수 있다. 그러니 예전 array를 가져와서 변형하고 새로운 array에 넣는다.
//   );
// }
//------------------------------비트코인 리스트 알아내는 것--------------------------------
// function App() {
//   const [loading, setLoading] = useState(true);
//   const [coins, setCoins] = useState([]); // useStae안에 그냥 비워두면 오류남 그래서 빈 리스트를 적어둠
//   useEffect(() => {
//     fetch("https://api.coinpaprika.com/v1/tickers") // 이 사이트를 fetch를 통해 가져옴
//       .then((response) => response.json()) //json 파일을 가져옴
//       .then((json) => {
//         setCoins(json); //coins에 json 파일을 갔다둔다.
//         setLoading(false); //한번 로딩되면 false를 줘서 멈춘다
//       });
//   }, []);
//   return (//밑엔 왜또 $를 붙였지?
//   //loading 중이면 코인갯수가 안뜸
//     <div>
//       <h1>The Coins {loading ? "" : `(${coins.length})`}</h1>
//       {loading ? (
//         <strong>Loading</strong>
//       ) : (
//         <select>
//           {coins.map((coin) => (
//             <option>
//               {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
//             </option>
//           ))}
//         </select>
//       )}
//     </div> //왜 oin.quotes 앞에는 $을 붙이지?
//     //   <ul>
//     //   {coins.map((coin) => (
//     //     <li>
//     //       {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
//     //     </li>
//     //   ))}
//     // </ul> 이 함수는 각각의 coins들을 coin이라는 인수를 이용해서 이름, 심볼, 가격을 빼오는 역할을 한다.
//   );
// }
// App은 router(url를 보고있는 컴포넌트다) 를 render 한다
//router를 쓰게 해줌
//link는 새로고침을 하지않고서도 다른 페이지로 이동시켜준다.
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import { BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
//Switch는 Route를 찾고 컴포넌트를 랜더링한다.
// / 안에 있으면 Home를 띄워준다.
// id 앞에 : 를 붙여야 1,2,3,4,...등 숫자를 넣을 수 있다.
function App() {
  return (
  <Router>
    <Routes> 
      <Route path="/movie/:id" element={<Detail />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  </Router>
  );
}

export default App;
