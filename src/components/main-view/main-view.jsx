import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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
    }, [token]);
      
        return (
            <Container fluid>
                <Row className="justify-content-center">
                    {!user ? (
                        <Col md={6}>
                            <LoginView
                                onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                    localStorage.setItem("user", JSON.stringify(user));
                                    localStorage.setItem("token", token);
                                }}
                            />
                            <div className="text-center my-3">or</div>
                            <SignupView />
                        </Col>
                    ) : selectedMovie ? (
                        <Col>
                            <MovieView 
                                movie={selectedMovie} 
                                onBackClick={() => setSelectedMovie(null)} 
                            />
                        </Col>
                    ) : movies.length === 0 ? (
                        <Col className="text-center">
                            <div>The list is empty</div>
                        </Col>
                    ) : (
                        <Col>
                            <div className="d-flex justify-content-end mb-3">
                                <Button 
                                    variant="danger"
                                    onClick={() => {
                                        setUser(null);
                                        setToken(null);
                                        localStorage.clear();
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>
                            
                            <h1 className="mb-4">Movies</h1>
                            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                                {movies.map((movie) => (
                                    <Col key={movie.id}>
                                        <MovieCard
                                            movie={movie}
                                            onMovieClick={() => setSelectedMovie(movie)} 
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    )}
                </Row>
            </Container>
        );
    };