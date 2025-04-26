import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-view/movie.view";
import { MovieView } from "../movie-view/movie.view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Route, Routes, Navigate,Link } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const Mainview = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(storedToken || null);
  const [password, setPassword] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredMovies = movies.filter((movie) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      movie.title.toLowerCase().includes(searchTerm) ||
      (movie.genreName && movie.genreName.toLowerCase().includes(searchTerm)) ||
      (movie.directorName && movie.directorName.toLowerCase().includes(searchTerm))
    );
  });

  useEffect(() => {
    if (!token) return;

    const fetchPoster = async (title) => {
      const apiKey = 'c1ed012d'; // replace this with YOUR real OMDb API key
      try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
        const data = await response.json();
        return data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x450?text=No+Image";
      } catch (error) {
        console.error("Error fetching poster for", title, error);
        return "https://via.placeholder.com/300x450?text=No+Image"; // fallback
      }
    };

    const fetchAllData = async () => {
      try {
        // Fetch movies, directors, and genres in parallel
        const [moviesRes, directorsRes, genresRes] = await Promise.all([
          fetch("https://movies-fix-b2e97731bf8c.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch("https://movies-fix-b2e97731bf8c.herokuapp.com/movies/directors", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch("https://movies-fix-b2e97731bf8c.herokuapp.com/movies/genres", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
  
        // Handle movies response
        if (!moviesRes.ok) throw new Error('Movies fetch failed');
        const moviesData = await moviesRes.json();
        
        // Handle directors response
        if (!directorsRes.ok) throw new Error('Directors fetch failed');
        const directorsData = await directorsRes.json();
  
        // Handle genres response
        if (!genresRes.ok) throw new Error('Genres fetch failed');
        const genresData = await genresRes.json();
        const  moviesFromApi = await Promise.all(moviesData.map(async(movie) => {
         const posterImage = movie.posterImage || await fetchPoster(movie.title);
          return {
          id: movie._id,
          title: movie.title,
          posterImage,
          directorName: movie.director?.name,
          director: movie.director,
          genreName: movie.genre?.name,
          genre: movie.genre,
          releaseYear: movie.releaseYear,
          duration: movie.durationMinutes,
          rating: movie.rating,
          cast: movie.cast?.map(actor => `${actor.name} as ${actor.role}`)
        };}));
        setMovies(moviesFromApi);
        setDirectors(directorsData);
        setGenres(genresData);
     
        localStorage.setItem("movies", JSON.stringify(moviesFromApi)); // Store movies in local storage
      } catch (error) {
        console.error("Fetching movies failed:", error);
        setMovies([]);
        setDirectors([]);
        setGenres([])
      }
    };
      fetchAllData();
  }, [token]);

  return (
    <BrowserRouter>
    <NavigationBar
    user={user}
    searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    onLoggedOut={()=>{
      setUser(null);
    }}
    />
      <Container className="main-view">
        <Routes>
        <Route
    path="/profile"
    element={
      !user ? ( 
        <Navigate to="/login" replace />
      ) : (
        <ProfileView 
          user={user} 
          token={token} 
          movies={movies}
          onUpdateUser={(updatedUser) => {
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }}
          onLogout={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
      )
    }
  />
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Row className="justify-content-center">
                  <Col md={5}>
                    <SignupView />
                  </Col>
                </Row>
              )
            }
          />
          
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Row className="justify-content-center">
                  <Col md={4}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                      }}
                    />
                  </Col>
                </Row>
              )
            }
          />
          
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Row className="justify-content-center">
                  <Col className="text-center">
                    <div>The list is empty</div>
                  </Col>
                </Row>
              ) : (
                <Row className="justify-content-center">
                  <Col md={8}>
                    <MovieView movies={movies} 
                    genres={genres}
                    directors={directors}
                    user={user} 
                    token={token} 
                    onUserUpdate={(updatedUser) => {
                      setUser(updatedUser);
                      localStorage.setItem('user', JSON.stringify(updatedUser));
                    }} 
                    />
                  </Col>
                </Row>
              )
            }
          />
          
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Row className="justify-content-center">
                  <Col className="text-center">
                    <div>The list is empty</div>
                  </Col>
                </Row>
              ) : (
                <Row>
                  {filteredMovies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard
                       movie={movie}
                       genres={genres}
                       directors={directors}
                       user={user}
                            token={token}
                            onUserUpdate={(updatedUser) => {
                                setUser(updatedUser);
                                localStorage.setItem('user', JSON.stringify(updatedUser));
                            }}
                       />
                    </Col>
                  ))}
                </Row>
              )
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};