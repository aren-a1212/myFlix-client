import PropTypes from "prop-types"
export const MovieCard = ({movie , onMovieClick})=>{
    return(
        <div
        onClick={()=>{
         onMovieClick(movie);
        }}
        >
            {movie.title}
            </div>
    );
};
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            birthYear: PropTypes.number.isRequired, // Change to number if applicable
        }).isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};

   