import { useEffect } from "react";
import { useParams } from "react-router-dom"; //useParams는 url에 있는 (변경되는)값을 반환하는 함수

function Detail() {
  const { id } = useParams(); //Route에서 변하는 값을 나타내줌 만약 App.js에서 <Route path="/movie/:id" element={<Detail />}></Route> 에서 id가 아니라 '정연찬' 이라고 했음 정연찬:32323 이런식으로 뜸 // {id}라고 하면 App에서 썻던 걸 불러옴
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(id);
  return <h1>Detail</h1>;
}
export default Detail;
