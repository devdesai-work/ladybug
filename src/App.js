import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components";
import Secondary from "./secondary";
import Login from "./login.js";
import Signup from "./signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={() => <Home />} />
        <Route path="/your_work" exact component={() => <Secondary />} />
        <Route path="/login" exact component={() => <Login />} />
        <Route path='/signup' exact component={() => <Signup />} />
      </Router>
    </div>
  );
}

export default App;
