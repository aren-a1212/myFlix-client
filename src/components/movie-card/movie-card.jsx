import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-view.scss";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, genres = [], directors = [], onUserUpdate }) => {

  const matchedGenre = genres.find((g) => g._id === movie.genre);
  const matchedDirector = directors.find((d) => d._id === movie.director);
  const isFavorite = user?.favoriteMovies?.includes(movie.id);

  const toggleFavorite = async () => {
    // Add null checks for user and username
    if (!user || !user.username) {
      console.error("User data is missing");
      alert("Please log in again");
      return;
    }

    setIsProcessing(true);
    try {
      const method = isFavorite ? "DELETE" : "POST";
      // Use the endpoint format from your backend
      `https://movies-fix-b2e97731bf8c.herokuapp.com/users/${user.username}/${movie.id}`;
      console.log("Attempting API call to:", endpoint);
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Operation failed");
      }

      const updatedUser = await response.json();
      onUserUpdate(updatedUser);
    } catch (error) {
      console.error("Favorite error:", error);
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <Card className="h-100 movie-card">
      <Card.Img
        variant="top"
        src={movie.posterImage || "https://via.placeholder.com/300x450?text=No+Image"}
        alt={`${movie.title} poster`}
      />

      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          <div>Genre: {movie.genre.name}</div>
          <div>Director: {movie.director.name}</div>
          <div>Year: {movie.releaseYear}</div>
          <div>Rating: {movie.rating}/10</div>
        </Card.Text>
        <Link to={`movies/${movie.id}`}>
          details
        </Link>
        {user && (
          <Button
            variant={isFavorite ? "success" : "outline-secondary"}
            onClick={toggleFavorite}
            disabled={isProcessing}
          >
            {isProcessing ? "..." : (isFavorite ? "★ Favorited" : "☆ Favorite")}
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


