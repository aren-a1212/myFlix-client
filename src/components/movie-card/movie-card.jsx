import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-view.scss";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, onUserUpdate }) => {
    const isFavorite = user?.FavoriteMovies?.includes(movie.id);
  
    const toggleFavorite = async () => {
      try {
        const method = isFavorite ? "DELETE" : "POST";
        const endpoint = `https://movies-fix-b2e97731bf8c.herokuapp.com/users/${user.Username}/movies/${movie.id}`;
        
        const response = await fetch(endpoint, {
          method,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
  
        if (response.ok) {
          const updatedUser = await response.json();
          onUserUpdate(updatedUser); // Update user state in parent
        }
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    };
    
    return (
        <Card className="h-100"> 
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                    <div>Genre: {movie.genre.name}</div>
                    <div>Director: {movie.director.name}</div>
                    <div>Year: {movie.releaseYear }</div>
                    <div>Rating: {movie.rating }/10</div>
                </Card.Text>
                <Link to={`movies/${movie.id}`}>
                details
                </Link>
                {user && (
            <Button
              variant={isFavorite ? "success" : "outline-secondary"}
              onClick={toggleFavorite}
            >
              {isFavorite ? "★ Favorited" : "☆ Favorite"}
            </Button>
          )}
            </Card.Body>
        </Card>
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
    user: PropTypes.object,
  token: PropTypes.string,
  onUserUpdate: PropTypes.func.isRequired
};


   