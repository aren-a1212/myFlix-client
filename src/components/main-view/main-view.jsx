import { useState } from "react";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "../movie-view/movie.view";
export const Mainview = () => {
    const [movies, setMovies]=useState([
        {
            id: 1,
            title: "Inception",
            description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the task of planting an idea into the mind of a CEO.",
            posterImage:"public/images/inception.jpg",
            genre: "Sci-Fi, Action",
            director: "Christopher Nolan",
            releaseYear: 2010
        },
        {
            id: 2,
            title: "The Lion King",
            description: "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
            posterImage: "public/images/lionking.jpg",
            genre: "Animation, Adventure, Drama",
            director: "Jon Favreau",
            releaseYear: 1994
        },
        {
            id: 3,
            title: "Titanic",
            description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
            posterImage:"public/images/titanic.jpg",
            director: "James Cameron",
            releaseYear: 1997
        }
    ]);

    const [selectedMovie, setSelectedMovie]= useState(null);
    if(selectedMovie){
        return <MovieView movie={selectedMovie} onBackClick={()=>setSelectedMovie(null)} />;
    }

    if (movies.length===0){
        return<div>The List is Empty</div>
    }
    return (
        <div>
            {movies.map((movie) => {
                return (
                    <MovieCard
                        key={movie.id} 
                        movie={movie}
                        onMovieClick={() => setSelectedMovie(movie)} 
                    />
                );
            })}
        </div>
    );
};