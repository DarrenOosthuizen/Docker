import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "font-awesome/css/font-awesome.min.css";
import React from "react";
import Navbar from "../NavBar/NavBar";
function Course() {
  return (
    <body>
      <Navbar />
      <div class="project" id="project">
        <div class="container mb-5">
          <h3 className="text-center">Courses</h3>
          <div class="row">
            <div class="col-md-6">
              <ul class="timeline">
                <li>
                  <h4>
                    <span>2021 - </span>Complete ASP.Net Core and Entity
                    Framework Development
                  </h4>
                  <p>
                    I was part of a team that was tasked with creating a meal
                    planner application. The application was able to keep track
                    of the client’s calorie intake as well as weight management
                    and allowed client to set goals. They were able to plan a
                    healthy alternative meal and the mobile/desktop application
                    will show the client the nearest shops with prices of the
                    items needed for those specific meals
                    <br />
                    <b>Udemy Course</b> -{" "}
                    <a href="https://www.udemy.com/course/complete-aspnet-core-31-and-entity-framework-development/learn/lecture/17456476?start=0#overview">
                      ASP.Net Core and Entity Framework
                    </a>
                    <br />
                  </p>
                </li>
                <li>
                  <h4>
                    <span>2021 - </span>React Native - The Practical Guid[2021
                    Edition]
                  </h4>
                  <p>
                    For 2nd year programming our project was to develop a
                    desktop application for flight simulation in C#. The user
                    will need to select the fighter plane they will use in the
                    simulation, what inventory the plane will carry. The user
                    will also map out the enemy base as well as map out the path
                    from the friendly base to enemy base with troops and
                    vehicles. Once the details are captured by the user the
                    simulation program will automatically derive the shortest
                    route, with the least damage to the plane, to the enemy base
                    and back
                    <br />
                    <b>Udemy Course</b> -{" "}
                    <a href="https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15420072?start=285#overview">
                      React Native
                    </a>
                    <br />
                  </p>
                </li>
              </ul>
            </div>
            <div class="col-md-6">
              <ul class="timeline">
                <li>
                  <h4>
                    <span>2021 - </span>AWS Academy Cloud Foundations [3535]
                  </h4>
                  <p>
                    Completing a AWS Course through Belgium Campus and with AWS
                    Canvas. This course will allow us to write an exam to obtain
                    the AWS Certified Cloud Practitioner certificate.
                    <br />
                    <br />
                    We will obtain an overall understanding of cloud computing
                    concepts, independent of specific technical roles. It
                    provides a detailed overview of cloud concepts, AWS core
                    services, security, architecture, pricing, and support.
                    <br />
                    <b>Institution</b> -{" "}
                    <a href="https://academy.amazon.in/">Amazon Academy</a>
                    <br />
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

export default Course;
