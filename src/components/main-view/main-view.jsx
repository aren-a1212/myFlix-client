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
          const moviesFromApi = data.map((movie) => ({
            id: movie._id,
            title: movie.title,
            description: movie.description,
            director: movie.director,
            genre: movie.genre,
                }));
                setMovies(moviesFromApi);
                console.log("Movies set in state:", moviesFromApi);
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