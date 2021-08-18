import './App.css';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import {Home} from "./pages/home/Home";
import {Login} from "./pages/login/Login";

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
