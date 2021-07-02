import React from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";


import NavBar from "../components/Home/NavBar/NavBar";
import Bio from "../components/Home/Bio/Bio";
import Skills from "../components/Home/Skills/Skills";
import Language from "../components/Home/CodeLanguage/Language";
import Contact from "../components/Home/Contact/Contact";
import Aux from "../hoc/Auxillary";

const Home = ()=> {
  return (
    <Aux>
        <NavBar/>
        <Bio/>
        <div className="social-icons">
        <ul>
          <a href="https://github.com/DarrenOosthuizen">
          <li>
            <i class="fab fa-github"></i>
            </li>
          </a>
          <a href="https://www.linkedin.com/in/darren-oosthuizen-2b3582209/">
          <li>
            <i class="fab fa-linkedin"></i>
            </li>
          </a>
          <a href="https://www.twitter.com">
          <li>
            <i class="fab fa-twitter"></i>
            </li>
          </a>
        </ul>
      </div>
        <Skills/>
        <Language/>
        <Contact/>
      <div class="container footer">
        <div class="row footerborder justify-content-center">
          <div class="col-md-6 footertext pt-2 text-center">
            <h6>Copyright © FlyStudio(Pty) Ltd 2021 All rights Reserved</h6>
          </div>
        </div>
      </div>
    </Aux>
  );
}

export default Home;
