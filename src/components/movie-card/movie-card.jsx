import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./movie-view.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
    console.log("MovieCard props:", { movie, onMovieClick });
    
    return (
        <Card className="h-100" 
        Button onClick={() => onMovieClick(movie)} 
        style={{ cursor: "pointer" }}> 
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                    <div>Genre: {movie.genre.name}</div>
                    <div>Director: {movie.director.name}</div>
                    <div>Year: {movie.releaseYear }</div>
                    <div>Rating: {movie.rating }/10</div>
                </Card.Text>
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
    onMovieClick: PropTypes.func.isRequired
};

   