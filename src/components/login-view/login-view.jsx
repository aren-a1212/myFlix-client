import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
  

    const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password
    };

    fetch("https://movies-fix-b2e97731bf8c.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    })
    .then(response => response.json()) 
    .then((data) => {
        if (data.user && data.token) {  
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
        } else {
            alert("Login failed: Invalid credentials");
        }
    })
    .catch((error) => {
        console.error("Error logging in:", error);
        alert("An error occurred. Please try again.");
    });
};
  return (

    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
      <h2 className="mb-4 text-center">Login</h2>
      <Form.Label>
        Username:
        </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </Form.Group>
     
      <Form.Group controlId="formPassword">
      <Form.Label>
        Password:
        </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};