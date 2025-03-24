import { useEffect, useState } from "react";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "../movie-view/movie.view";
import { useState, useEffect } from "react";
export const Mainview = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetch("https://movies-fix-b2e97731bf8c.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                if (!data || !data.movies) {
                    console.error("Unexpected API response:", data);
                    return;
                }
                const moviesFromApi = data.movies.map((movie) => ({
                    id: movie._id,
                    title: movie.title,
                    genre: movie.genre,
                    director: movie.director
                }));
                setMovies(moviesFromApi);
            })
            .catch((error) => console.error("Error fetching movies:", error));
    }, []);
      

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