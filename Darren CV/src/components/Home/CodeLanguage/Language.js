import React from "react";
import "./Language.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import "./css/all.css" ;

function Language() {
  return (
    <body>
      <div class="skillsattributes" id="skillsattributes">
        <div className="container justify-content-center">
          <h1 className="text-center">Coding Languages</h1>
          <p className="text-center">
            Languages that I am familiar with
            <br />
            One can never know all possible languages but can try his best to know most of them{" "}
          </p>
          <div className="row justify-content-center skillsbox">
            <div className="col-md-6">
              <div className="Skills-box text-center">
                <p className="text-center">
                  <i class="fab fa-empire"></i>
                  <span>Languages</span>
                </p>
                <p>
                  <br />
                  <i class="fab fa-html5"></i>
                  <span>HTML 5</span>
                  <br />
                  <i class="fab fa-css3"></i>
                  <span>CSS 3</span>
                  <br />
                  <i class="fab fa-js"></i>
                  <span>JAVASCRIPT</span>
                  <br />
                  <i class="fab fa-react"></i>
                  <span>REACT</span>
                  <br />
                  <i class="fab fa-node-js"></i>
                  <span>NODE JS</span>
                  <br />
                  <i class="fab fa-android"></i>
                  <span>REACT NATIVE</span>
                  <br />
                  <i class="fab fa-cuttlefish"></i>
                  <span>C#</span>
                  <br />
                  <i class="fas fa-database"></i>
                  <span>SQL</span>
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Language;
