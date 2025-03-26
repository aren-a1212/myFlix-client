 export const MovieView = ({ movie, onBackClick }) => {
    console.log('Current movie object:', JSON.stringify(movie, null, 2));
    return (
        <div>
            <img src={movie.posterImage} alt={movie.title} width="200" />
            {movie.genre && (
      <p>
        <strong>Genre:</strong> 
        {movie.genre.name} - {movie.genre.description}
      </p>
    )}
    
  
    {movie.director && (
      <>
        <p><strong>Director:</strong> {movie.director.name}</p>
        {movie.director.bio && <p>{movie.director.bio}</p>}
      </>
    )}
    
    <p><strong>Release Year:</strong> {movie.releaseYear}</p>
            <ul>
    {movie.cast.map((actorString, index) => (
        <li key={index}>{actorString}</li>
    ))}
</ul>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
import PropTypes from "prop-types"
export const MovieCard = ({movie , onMovieClick})=>{
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
MovieView.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired, 
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            birthYear: PropTypes.number,
            deathYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
        }).isRequired,
        releaseYear: PropTypes.number,
        rating: PropTypes.number,
        cast: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                role: PropTypes.string.isRequired
            })
        )
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};

   