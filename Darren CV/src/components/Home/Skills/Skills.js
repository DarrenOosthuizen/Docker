import React from "react";
import "./Skills.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";

function Skills() {
  return (
    <body>
      <div class="skillsattributes" id="skillsattributes">
        <div className="container justify-content-center">
          <h1 className="text-center">Skills & Attributes</h1>
          <p className="text-center">
            Skills and Attributes which I have.
            <br />
            Always willing to learn new skills that I can one day teach others
            and to have top attributes{" "}
          </p>
          <div className="row justify-content-center skillsbox">
            <div className="col-md-5 mb-4">
              <div className="Skills-box">
                <p className="text-center">
                  <i class="fa fa-empire"></i>
                  <span>Skills</span>
                </p>
                <p>
                  <br />
                  ➢ Linear Programming
                  <br />
                  ➢ Logical Thinker
                  <br />
                  ➢ Computer Building
                  <br />
                  ➢ Trouble Shooting
                  <br />
                  ➢ Microsoft SQL Server
                  <br />
                  ➢ Microsoft 365
                  <br />
                  ➢ Project Management
                  <br />
                  ➢ Problem Solving
                  <br />
                  ➢ Basic Windows Server Skills
                  <br />➢ Sales
                </p>
              </div>
            </div>
            <div className="col-md-5">
              <div className="Skills-box">
                <p className="text-center">
                  <i className="fa fa-code-fork"></i>
                  <span>Attributes</span>
                </p>
                <p>
                  ➢ Leadership
                  <br />
                  ➢ Hard Working
                  <br />
                  ➢ Deadline Driven
                  <br />
                  ➢ Team Building
                  <br />
                  ➢ Communication
                  <br />
                  ➢ Always willing to learn new
                  <br />
                  skills
                  <br />
                  ➢ Challenge Driven
                  <br />
                  ➢ Time Management
                  <br />
                  ➢ Passionate
                  <br />
                  ➢ Honest
                  <br />
                  ➢ Attention to Detail
                  <br />
                  ➢ Friendly
                  <br />
                  ➢ Listener
                  <br />
                  ➢ Thinking outside the box
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

export default Skills;
