import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">
        Login
      </button>
    </form>
  );
};