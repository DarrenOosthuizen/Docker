import React from "react";
import "./Bio.css";
import CVImage from "../../../resources/images/Portrait.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";

function Bio() {
  return (
    <body>
      <div class="about container" id="about">
        <div class="row">
          <div class="col-md-6 text-center">
            <img src={CVImage} class="profile-img" alt="CV" />
          </div>
          <div class="col-md-6">
            <h3>WHO AM I?</h3>
            <p class="aboutwhop">
              I am currently in my 3rd year studying Bachelor of Computing at
              Belgium Campus ITVersity in Kempton Park. I am a hard worker,
              determined, very friendly and always up for a challenge. I enjoy
              programming and learning new skills within the IT industry. My
              ultimate goal is to excel in what I do and to create the best
              possible version of myself.
            </p>

            <div class="skills-bar">
              <p>Visual Studio</p>
              <div class="progress">
                <div class="progress-bar" style={{ width: "80%" }}>
                  80%
                </div>
              </div>
              <p>Visual Studio Code</p>
              <div class="progress">
                <div class="progress-bar" style={{ width: "70%" }}>
                  70%
                </div>
              </div>
              <p>MySQL</p>
              <div class="progress">
                <div class="progress-bar" style={{ width: "80%" }}>
                  80%
                </div>
              </div>
              <p>React and React Native</p>
              <div class="progress">
                <div class="progress-bar" style={{ width: "60%" }}>
                  60%
                </div>
              </div>
              <p>GitHub</p>
              <div class="progress">
                <div class="progress-bar" style={{ width: "75%" }}>
                  75%
                </div>
              </div>
              <p>Docker</p>
              <div class="progress">
                <div class="progress-bar" style={{ width: "80%" }}>
                  80%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Bio;
