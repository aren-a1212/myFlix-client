import PropTypes from "prop-types"
export const MovieCard = ({movie , onMovieClick})=>{
    console.log("MovieCard props:", { movie, onMovieClick });
    return(
        <div
        onClick={()=>{
         onMovieClick(movie);
        }}
        >
        
            <h3>{movie.title}</h3>
            <p>Genre:{movie.genre.name}</p>
            <p>Director: {movie.director.name}</p>
            <p>Year:{movie.releaseYear}</p>
            <p>Rating: {movie.rating}/10</p>
            </div>
    );
};
MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        genreName: PropTypes.string,
        directorName: PropTypes.string,
        posterImage: PropTypes.string,
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

   