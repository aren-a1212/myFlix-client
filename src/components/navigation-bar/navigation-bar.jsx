import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const NavigationBar = ({ user, onLoggedOut, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(location.pathname === "/");

  useEffect(() => {

    setShowSearch(location.pathname === "/");
  }, [location.pathname]);


  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");


    onLoggedOut();


    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MYFLIX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Button variant="link" onClick={handleLogout}> {/* Button for logout */}
                  Logout
                </Button>
                {showSearch && (
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search movies by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-control"
                    />
                    {searchQuery && (
                      <Button className="clear-button" onClick={() => setSearchQuery("")}>
                        ✖
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
