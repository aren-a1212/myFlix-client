import { useEffect, useState } from "react";
import { MovieCard } from "../movie-view/movie.view";
import { MovieView } from "../movie-view/movie.view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const Mainview = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken= localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user , setUser]= useState(storedUser ||null);
    const [token , setToken]= useState(storedToken ||null);
    const [password, setPassword]= useState(null);
    const [selectedMovie, setSelectedMovie]= useState(null);
    
    useEffect(() => {
        if (!token) return;

        fetch("https://movies-fix-b2e97731bf8c.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }
                return response.json();
            })
            .then((data) => {
                const moviesFromApi = data.map((movie) => ({
                    id: movie._id,
                    title: movie.title,
                    posterImage: movie.posterImage,
                    directorName: movie.director?.name,
                    director: movie.director, 
                    genreName: movie.genre?.name,
                    genre: movie.genre,
                    releaseYear: movie.releaseYear,
                    duration: movie.durationMinutes,
                    rating: movie.rating,
                    cast: movie.cast?.map(actor => `${actor.name} as ${actor.role}`)
                }));
                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
                setError(error.message);
            });
    }, [token, storedToken]);
      
    if (!user) {
        return (
            <>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
              localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);
            }} 
          />
          or 
          <SignupView />
          </>
            );
        };
    
 
    if(selectedMovie){
        return <MovieView movie={selectedMovie} onBackClick={()=>setSelectedMovie(null)} />;
    }

    if (movies.length===0){
        return<div>The List is Empty</div>
    }
    return (
        <div>
            <button onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }}>Logout</button>
            
            <h1>Movies</h1>
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