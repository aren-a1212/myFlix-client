import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
export const MovieView = ({ movies, user, token, onUserUpdate  }) => {
    const {movieId} = useParams();
    const movie = movies.find((m)=>m.id===movieId);
    console.log('Current movie object:', JSON.stringify(movie, null, 2));
    const isFavorite = user?.FavoriteMovies?.includes(movieId);

  const toggleFavorite = async () => {
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const endpoint = `https://movies-fix-b2e97731bf8c.herokuapp.com/users/${user.Username}/movies/${movieId}`;
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const updatedUser = await response.json();
        onUserUpdate(updatedUser);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

    return (
        <div>
          
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
          <Link to={`/`}>
            <Button variant="link">Back</Button>
            </Link>
        
            {user && (
        <Button
          variant={isFavorite ? "danger" : "outline-primary"}
          onClick={toggleFavorite}
        >
          {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </Button>
      )}
          </div>
    );
};

export const MovieCard = ({movie})=>{
    return(
        <Link to={`/movies/${movie.id}`} >
            <h3>{movie.title}</h3>
            <p>Genre:{movie.genre.name}</p>
            <p>Director: {movie.director.name}</p>
            <p>Year:{movie.releaseYear}</p>
            <p>Rating: {movie.rating}/10</p>
            </Link>
            
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
    user: PropTypes.object,
  token: PropTypes.string,
  onUserUpdate: PropTypes.func.isRequired
};

   