import PropTypes from "prop-types";
import {
  Link
} from "react-router-dom";
function Movie({ id, coverImg, title, summary, genres }) {
  //movie 컴포넌트가 부모 컴포넌트로부터 정보들을 받아오고 있다
  return (
    //↓↓img는 alt가 있어야 됨
    <div>
      <img src={coverImg} alt={title} />
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;
