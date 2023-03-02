import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

const UserSup = () => {
  const notyf = new Notyf();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [obj, setObj] = useState('');
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    const grants = obj.split(" ");
    const blog = { username, password, name, grants};

    fetch('http://localhost:8080/oauth/signup', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      notyf.success("User Registered Successfully");
      setUsername('');
      setName('');
      setPassword('');
      setObj('');
      history.push('/usersignup');
    })
  }

    return ( 
        <div className="create">
      <h1>User SignUp</h1> <br />
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Username: </label>
        <input 
          type="text" 
          required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password: </label>
        <input 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Grants: <span style ={{fontWeight: 400}}>(each should be separated by one space)</span></label>
        <input 
          type="text" 
          required 
          value={obj}
          onChange={(e) => setObj(e.target.value)}
        />
        <button>SignUp</button>
      </form>
    </div>
     );
}
 
export default UserSup;