import "./Project.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "font-awesome/css/font-awesome.min.css";
import React from "react";

import Navbar from '../NavBar/NavBar';

function Project() {
  return (
    <body>
      <Navbar/>
      <div class="project" id="project">
          <div class="container mb-5">
          <h3 className="text-center">Projects</h3>
            <div class="row"> 
              <div class="col-md-6">
                <ul class="timeline">
                  <li>
                    <h4>
                      <span>2019 - </span>Innovation and Leadership Project
                    </h4>
                    <p>
                      I was part of a team that was tasked with creating a meal
                      planner application. The application was able to keep
                      track of the client’s calorie intake as well as weight
                      management and allowed client to set goals. They were able
                      to plan a healthy alternative meal and the mobile/desktop
                      application will show the client the nearest shops with
                      prices of the items needed for those specific meals
                      <br />
                      <b>Institution</b> -{" "}
                      <a href="https://www.belgiumcampus.ac.za/">
                        Belgium Campus ITVersity
                      </a>
                      <br />
                      <b>Duties :</b> <br />
                      <i>
                        - Part of Planning Process (Collected data from
                        different shops for database)
                        <br />
                        - Presentation (Presenting part of the application as
                        well as documentation to the board of the Belgium
                        ITVersity)
                        <br />
                      </i>
                    </p>
                  </li>
                  <li>
                    <h4>
                      <span>2020 - </span>Flight Simulation Project
                    </h4>
                    <p>
                      For 2nd year programming our project was to develop a
                      desktop application for flight simulation in C#. The user
                      will need to select the fighter plane they will use in the
                      simulation, what inventory the plane will carry. The user
                      will also map out the enemy base as well as map out the
                      path from the friendly base to enemy base with troops and
                      vehicles. Once the details are captured by the user the
                      simulation program will automatically derive the shortest
                      route, with the least damage to the plane, to the enemy
                      base and back
                      <br />
                      <b>Institution</b> -{" "}
                      <a href="https://www.belgiumcampus.ac.za/">
                        Belgium Campus ITVersity
                      </a>
                      <br />
                      <b>Duties :</b>
                      <br />
                      <i>
                        - Team Leader
                        <br />
                        - Developed entire back end of project
                        <br />
                        - Developed SQL Database which the application worked
                        from, either locally or remotely
                        <br />
                        - Presentation (Present the project to the lecturer)
                        <br />
                      </i>
                    </p>
                  </li>
                </ul>
              </div>
              <div class="col-md-6">
                <ul class="timeline">
                  <li>
                    <h4>
                      <span>2021 - </span>Ticket Support System
                    </h4>
                    <p>
                      Technical Advisor for AOLC On-Line. Assist in all day to
                      day tasks involving onsite support to remote support,
                      server configuration and terminal setups.
                      <br />
                      <b>Company</b> -{" "}
                      <a href="https://www.aolc.co.za/">
                        AOLC On-Line (Pty) Ltd
                      </a>
                      <br />
                      <b>Period</b> - 1 Year [2020 - Present] <br />
                      <b>Location</b> - Boksburg
                    </p>
                  </li>
                  <li>
                  <h4>
                      <span>2021 - </span>Mega Project- International
                    </h4>
                    <p>
                      Belgium Campus ITVersity, PXL University of Applied
                      Sciences and Arts (Belgium) with Fontys University of
                      Applied Sciences (Netherlands) February 2021 – Present.
                      <br />
                      <br />
                      I am currently in a team of 6 members, two from each
                      varsity and our project for this year will be Eco Village
                      Air quality Project. We have just started with the
                      planning phase.
                      <br />
                      <b>Intitution 1</b> -{" "}
                      <a href="https://fontys.edu">
                        Fontys University of Applied Sciences
                      </a>
                      <br />
                      <b>Intitution 2</b> -{" "}
                      <a href="https://www.pxl.be">
                        Merchant logo PXL University of Applied Sciences and
                        Arts
                      </a>
                      <br />
                      <b>Intitution 3</b> -{" "}
                      <a href="https://www.belgiumcampus.ac.za/">
                        Belgium Campus ITVersity
                      </a>
                      <br />
                      <b>Duties :</b>
                      <br />
                      <i>
                        - Software Engineer Team Lead
                        <br />
                        - One of two software engineers from Belgium Campus, we will be responsibile for developing Mobile Application to connect with multiple smart sensors and also to Weather data sets
                        <br />
                        - Developing Andriod and IOS mobile application in React Native with EXPO Cli
                        <br />
                      </i>
                    </p>
                  </li>
                </ul>
              </div>
              <div id="coursebegin" class="mb-2"></div>
            </div>
          </div>
        </div>
    </body>
  );
}

export default Project;
