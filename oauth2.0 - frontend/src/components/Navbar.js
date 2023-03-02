import { BrowserRouter as Router, Link } from "react-router-dom";


const Navbar = () => {
  const b_token = localStorage.getItem('b_token');
  const dash = (b_token===null) ? {to : "/signin"} : {to : "/dashboard"};
  return (
    <nav className="navbar">
      <h1>Oauth 2.0</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/usersignup">User SignUp</Link>
        <Link to="/clientsignup">Client SignUp</Link>
        <Link {...dash}>{(b_token===null)?"SignIn":"Dashboard"}</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;