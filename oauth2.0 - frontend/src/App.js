import Navbar from './components/Navbar';
import Home from './pages/Homepage';
import UserSup from './pages/usersignup';
import SignIn from './pages/signin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientSup from './pages/clientsignup';
import Dashboard from './pages/dashboard';
// import Create from './Create';
// import BlogDetails from './BlogDetails';
// import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/usersignup">
              <UserSup />
            </Route>
            <Route exact path="/clientsignup">
              <ClientSup />
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
