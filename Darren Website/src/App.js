import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/404";
import Aux from "./hoc/Auxillary";
import Layout from "./components/Layout/Layout";
import ReactGA from "react-ga";

const TRACKING_ID = "G-THHHCB406C";
ReactGA.initialize(TRACKING_ID);

const App = () => {
  return (
    <Aux>
      <Layout />
    </Aux>
  );
};

export default App;
