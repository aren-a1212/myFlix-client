import PropTypes from "prop-types"
export const MovieCard = ({movie , onMovieClick})=>{
    return(
        <div
        onClick={()=>{
         onMovieClick(movie);
        }}
        >
        
            <h3>{movie.title}</h3>
            <p>Genre:{movie.genre}</p>
            <p>Director: {movie.director}</p>
            <p>Year:{movie.releaseYear}</p>
            <p>Rating: {movie.rating}/10</p>
            </div>
    );
};
MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        genre: PropTypes.string,
        director: PropTypes.string,
        releaseYear: PropTypes.number,
        rating: PropTypes.number,
        description: PropTypes.string,
        cast: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                role: PropTypes.string.isRequired
            })
        )
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};

   