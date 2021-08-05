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

const App = () => {
  return (
    <Aux>
      <Layout />
    </Aux>
  );
};

export default App;
