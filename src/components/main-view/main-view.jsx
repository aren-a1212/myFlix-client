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
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [password, setPassword] = useState(null);

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
  }, [token]);

  return (
    <BrowserRouter>
    <NavigationBar
    user={user}
    onLoggedOut={()=>{
      setUser(null);
    }}
    />
      <Container>
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
                  {movies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard movie={movie} />
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