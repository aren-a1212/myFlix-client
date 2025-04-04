import { useState, useEffect } from 'react';
import { Button, Card, Form, Row, Col, Modal, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const ProfileView = ({ user, token, movies, onUpdateUser, onLogout }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday?.split('T')[0] || '');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate(); // hook to navigate programmatically

  // Get favorite movies whenever user or movies change
  useEffect(() => {
    if (user?.FavoriteMovies && movies) {
      const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));
      setFavoriteMovies(favoriteMovies);
    }
  }, [user, movies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://movies-fix-b2e97731bf8c.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(updatedUser => {
      onUpdateUser(updatedUser);
      alert('Profile updated successfully!');
    })
    .catch(error => {
      console.error('Error updating user:', error);
      alert('Failed to update profile');
    });
  };

  const handleDelete = () => {
    fetch(`https://movies-fix-b2e97731bf8c.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Account deleted successfully');
        onLogout();  // Handle logout, possibly by clearing session, tokens, etc.
        navigate('/');  // Redirect user to home page after logout
      }
    })
    .catch(error => {
      console.error('Error deleting user:', error);
    });
  };

  const removeFavorite = (movieId) => {
    fetch(`https://movies-fix-b2e97731bf8c.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(updatedUser => {
      onUpdateUser(updatedUser);
    })
    .catch(error => {
      console.error('Error removing favorite:', error);
    });
  };

  return (
    <Row className="justify-content-center mt-4">
      <Col md={8}>
        {/* Profile Information Card */}
        <Card className="mb-4">
          <Card.Header as="h4">Profile Information</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="birthday" className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Favorite Movies Card */}
        <Card>
          <Card.Header as="h4">Favorite Movies</Card.Header>
          <Card.Body>
            {favoriteMovies.length > 0 ? (
              <ListGroup variant="flush">
                {favoriteMovies.map(movie => (
                  <ListGroup.Item key={movie.id} className="d-flex justify-content-between align-items-center">
                    <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                    <Button 
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFavorite(movie.id)}
                    >
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>You haven't added any favorite movies yet.</p>
            )}
          </Card.Body>
        </Card>
      </Col>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}; 
