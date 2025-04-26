import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";



export const SignupView = ({ }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    Birthday: "",
  });
  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData,[name]: value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
      Birthday: Birthday
    };
    fetch("https://movies-fix-b2e97731bf8c.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.errors) {
        setErrors(responseData.errors);
      } else {
        alert("Signup successful");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/login"); 
        });
        
      }
    })
    .catch((error) => {
      console.error("Error during signup:", error);
      setErrors([{ msg: "An unexpected error occurred. Please try again." }]);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

  return (
    <Form className="signup-view" onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username:
        </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
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
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>
          Email:
        </Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>
          Birthday:
        </Form.Label>
        <Form.Control
          type="date"
          value={Birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formfirstName">
        <Form.Label>
          First Name:
        </Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formlastName">
        <Form.Label>
          Last Name:
        </Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">SignUp</Button>
    </Form>
  );
};