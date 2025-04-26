import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
export const MovieView = ({ movies, user, token,genres=[],directors=[], onUserUpdate  }) => {
    const {movieId} = useParams();
    const movie = movies.find((m)=>m.id===movieId);
    console.log('Current movie object:', JSON.stringify(movie, null, 2));
    const [currentMovie, setCurrentMovie] = useState(movie);
    const [shuffledSimilarMovies, setShuffleSimilarMovies]= useState([]);

    const matchedGenre = movie?.genre
    ?genres?.find((g) => g._id === movie.genre._id||g._id=== movie.genre)
    :null;
    const matchedDirector =movie?.director
    ?directors?.find((d) => d._id === movie.director._id||d._id=== movie.director)
    :null;
  if (!movie) return <div>Movie not found!</div>;


    const isFavorite = user?.favoriteMovies?.includes(movieId);

    useEffect(() => {
      if (movie) {
          setCurrentMovie(movie);
          // Get similar movies based on genre
          const similar = movies.filter((m) => 
              m.id !== movie.id && 
              (m.genre?._id === movie.genre?._id || m.genre === movie.genre)
          );
          // Shuffle similar movies
          setShuffleSimilarMovies([...similar].sort(() => 0.5 - Math.random()));
      }
  }, [movieId, movies, movie]);

  const toggleFavorite = async () => {
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const endpoint = `https://movies-fix-b2e97731bf8c.herokuapp.com/users/${user.username}/${movieId}`;
      
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
  if (!movie) return <div className="text-center py-5">Movie not found!</div>;

 
  useEffect(() => {
    setCurrentMovie(movie); 
  }, [movieId]);
  return (
    <div className="movie-view container mt-4">
        <div className="movie-details mb-5">
            <h2>{movie.title}</h2>

            {movie.posterImage && (
  <div className="text-center mb-4">
    <img
      src={movie.posterImage}
      alt={`${movie.title} Poster`}
      className="img-fluid rounded shadow"
      style={{ maxHeight: "500px" }}
    />
  </div>
)}

            
           
                <div className="mb-3">
                    <h5>Genre</h5>
                    <p>{movie.genre.name}</p>
                     <p>{movie.genre.description}</p>
                </div>
         
            
          
                <div className="mb-3">
                    <h5>Director</h5>
                    <p>{movie.director.name}</p>
                   <p>{movie.director.bio}</p>
                </div>
           
            
            <div className="mb-3">
                <h5>Details</h5>
                <p><strong>Release Year:</strong> {movie.releaseYear}</p>
                <p><strong>Rating:</strong> {movie.rating}/10</p>
            </div>
            
            {movie.cast?.length > 0 && (
                <div className="mb-3">
                    <h5>Cast</h5>
                    <ul>
                        {movie.cast.map((actorString, index) => (
                            <li key={index}>{actorString}</li>
                        ))}
                    </ul>
                </div>
            )}
            
            <div className="button-group mt-4">
                <Link to={`/`} className="me-2">
                    <Button variant="secondary">Back to List</Button>
                </Link>
                
                {user && (
                    <Button
                        variant={isFavorite ? "danger" : "primary"}
                        onClick={toggleFavorite}
                    >
                        {isFavorite ? "Remove Favorite" : "Add Favorite"}
                    </Button>
                )}
            </div>
        </div>
        
        {shuffledSimilarMovies.length > 0 && (
            <div className="similar-movies mt-5">
                <h4>Similar Movies</h4>
                <Row>
                    {shuffledSimilarMovies.slice(0, 3).map((movie) => (
                        <Col xs={12} sm={6} md={4} key={movie.id}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            </div>
        )}
    </div>
);
};

export const MovieCard = ({ movie }) => {
return (
    <div className="movie-card p-3 mb-4 border rounded">
        <Link to={`/movies/${movie.id}`} className="text-decoration-none">
            <h3>{movie.title}</h3>
            <p>Genre: {movie.genre?.name || 'Unknown'}</p>
            <p>Director: {movie.director?.name || 'Unknown'}</p>
            <p>Year: {movie.releaseYear}</p>
            <p>Rating: {movie.rating}/10</p>
        </Link>
    </div>
);
};

MovieView.propTypes = {
movies: PropTypes.array.isRequired,
user: PropTypes.object,
token: PropTypes.string,
genres: PropTypes.array,
directors: PropTypes.array,
onUserUpdate: PropTypes.func.isRequired
};

MovieCard.propTypes = {
movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.shape({
        name: PropTypes.string,
    }),
    director: PropTypes.shape({
        name: PropTypes.string,
    }),
    releaseYear: PropTypes.number,
    rating: PropTypes.number,
}).isRequired
};