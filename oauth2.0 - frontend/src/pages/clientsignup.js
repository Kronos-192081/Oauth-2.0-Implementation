import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

const ClientSup = () => {
    const notyf = new Notyf();
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [obj, setObj] = useState('');
  const history = useHistory();
  const redirectUris = "https://cse.iitkgp.ac.in";

  const handleSubmit = (e) => {
    e.preventDefault();
    const grants = obj.split(" ");
    const client_data = { clientId, clientSecret, grants, redirectUris };

    fetch('http://localhost:8080/oauth/set_client', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client_data)
    }).then(() => {
      setClientId('');
      setClientSecret('');
      setObj('');
      notyf.success("Client Registered Successfully");
      history.push('/clientsignup');
    })
  }

    return ( 
        <div className="create">
      <h1>Client SignUp</h1><br />
      <form onSubmit={handleSubmit}>
        <label>Client ID: </label>
        <input 
          type="text" 
          required 
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
        <label>Client Secret (Access Code): </label>
        <input 
          type="Password" 
          required 
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
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
 
export default ClientSup;