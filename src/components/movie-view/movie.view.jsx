 export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <img src={movie.posterImage} alt={movie.title} width="200" />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Release Year:</strong> {movie.releaseYear}</p>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};