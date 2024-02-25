import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
    
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
    // fetch(
    //   `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
    // )
    //   .then((response) => response.json()) //위 링크에서 받아온 응답을 json 형태로 변환하는 것
    //   .then((json) => {
    //     setMovies(json.data.movies);
    //     setLoading = false;
    //   }); //여기서 json 인수는 response.json()과 같다. 그 후 setMovies 함수를 통해 리스트에 movies를 넣는다  -------------> async await를 많이 쓴다.
  }, []);
  console.log(movies);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id} // key는 map 안에서 컴포넌트를 render할 때 사용하는 것
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  ); //map의 인수는 아무렇게나 설정해도 된다.
}

export default Home;