import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css';
import { API_URL } from "../constants";
import { encode } from "base-64";
import axios from "axios";

const SignIn = () => {
    const notyf = new Notyf();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [errUsername, setErrUsername] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [errClient, setErrClient] = useState('');
    const [errGrant, setErrGrant] = useState('');
    const history = useHistory();
    const grant_type = "password";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { username:user, password:pass, grant_type:grant_type};
        console.log(JSON.stringify(data));
        const bauth = 'Basic ' + encode(username + ":" + password)
        setIsPending(true);
        axios.post(API_URL + '/oauth/token', data, { headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': bauth}})
        .then((res) => {
            setIsPending(false);
            setErrUsername('');
            if(res.status < 350)
            {
                console.log(res);
                const msg = res.data;
                localStorage.setItem('b_token', "Bearer " + msg.access_token);
                localStorage.setItem('r_token', msg.refresh_token);
                history.push('/dashboard');
                history.go(0);
            }
            else
            {
            }
        })
        .catch((err) => {
            setIsPending(false);
            const er = err.response.data;
            setErrUsername('');
            setErrPassword('');
            setErrGrant('');
            setErrClient('');
            if(er.error === "server_error") setErrUsername("Invalid Username");
            if(er.error === "invalid_grant") setErrPassword("Incorrect Password");
            if(er.error === "unsupported_grant_type") setErrGrant("Password Based Login Not granted");
            if(er.error === "invalid_client") setErrClient("Invalid Client Details")
        })
    }
    
    return (
        <div className="create">
              <h1>Log In</h1>
              <p className="lead text-center">Sign in to your Account</p>
              <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    type="text"
                    required 
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                { (errUsername !== '') && <label style={{color: 'red', fontSize: 14}}>***{errUsername}***</label> }
                <label>Password</label>
                <input
                    type="password"
                    required
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                { (errPassword !== '') && <label style={{color: 'red', fontSize: 14}}>***{errPassword}***</label> }
                { (errGrant !== '') && <label style={{color: 'red', fontSize: 14}}>***{errGrant}***</label> }
                <label>Client ID</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Access Code (Client Secret)</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                { (errClient !== '') && <label style={{color: 'red', fontSize: 14}}>***{errClient}***</label> }
                <br />
                { !isPending && <button>Login</button> }
                { isPending && <button disabled>Logging in ...</button> }
            </form>
            </div>
  );
}
 
export default SignIn;