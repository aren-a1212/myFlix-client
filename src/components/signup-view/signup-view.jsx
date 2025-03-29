import{ useState } from "react";

export const SignupView = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data ={
        firstName:firstName,
        lastName:lastName,
        username: username,
        password: password,
        email: email,
        Birthday: birthday
    };
    fetch("https://movies-fix-b2e97731bf8c.herokuapp.com/users", {
        method:"POST",
        body:JSON.stringify(data),
        headers:{
           "Content-Type":"application/json"
        }
    }).then((response)=>{
        if(response.ok){
            alert("Signup successful");
            window.location.reload();
        }else{
            alert("Signup failer");
        }
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
          required
          minLength="3"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <label>
        First Name:
      <input type="text" 
      value={firstName}
       onChange={(e) => setFirstName(e.target.value)} 
       required />
       </label>
       <label>
        Last Name:
<input type="text" 
    value={lastName}
     onChange={(e) => setLastName(e.target.value)} 
     required />
     </label>
      <button type="submit">SignUp</button>
    </form>
  );
};