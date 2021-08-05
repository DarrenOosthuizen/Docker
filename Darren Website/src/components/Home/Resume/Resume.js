import "./Resume.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { NavLink } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import NavBar from "../NavBar/NavBar";


function Resume() {
  return (
    <body>
      <NavBar/>
    <div id="resumebegin"></div>
        <div class="resume mb-5" id="resume">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h3 class="text-center">Work Experience</h3>
                <ul class="timeline">
                  <li>
                    <h4>
                      <span>2017 - </span>Sales Assistant
                    </h4>
                    <p>
                      Sales Assistant at Outdoor Warehouse Alberton and later
                      moved to Boksburg branch where I officially left and
                      started on new adventures.
                      <br />
                      <b>Company</b> -{" "}
                      <a href="https://www.outdoorwarehouse.co.za/">
                        Outdoor Warehouse
                      </a>
                      <br />
                      <b>Period</b> - 4 Years [2017 - 2020] <br />
                      <b>Location</b> - Alberton , Boksburg
                    </p>
                  </li>
                  <li>
                    <h4>
                      <span>2020 - </span>Technical Advisor
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
                </ul>
              </div>

              <div class="col-md-6">
                <h3 class="text-center">Education</h3>
                <ul class="timeline">
                  <li>
                    <h4>
                      <span>2014 - </span>High Scool
                    </h4>
                    <p>
                      Matriculated from Alberton High School in 2018 with a
                      National Senior Certificate. Took Information Technology,
                      Physical Science and Engineering Graphics and Design as my
                      subject choices.
                      <br />
                      <b>High School</b> -{" "}
                      <a href="https://www.albertonhighschool.co.za/">
                        Alberton High School
                      </a>
                      <br />
                      <b>Period</b> - 5 Years [2014 - 2018] <br />
                      <b>Location</b> - Alberton
                    </p>
                  </li>
                  <li>
                    <h4>
                      <span>2019 - </span>University
                    </h4>
                    <p>
                      Enrolled at Belgium Campus ITVersity at Kempton Park in
                      2019. Currently studying Bachelor of Computing and
                      specializing in Software Engineering Stream. I am now in
                      my final year of studying and will be doing a 1 Year
                      Internship next year at a Software Company. Completed my
                      2nd Year as Top 3rd Student with a overall average of 86.6
                      with 12 Distinctions.
                      <br />
                      <b>University</b> -{" "}
                      <a href="https://www.belgiumcampus.ac.za/">
                        Belgium Campus ITVersity
                      </a>
                      <br />
                      <b>Period</b> - 3 Year [2019 - Present] <br />
                      <b>Location</b> - Kempton Park, Boksburg
                    </p>
                  </li>
                </ul>
              </div>
              <div id="projectbegin" class="mb-2"></div>
            </div>
          </div>
        </div>
        </body>
  )};

  export default Resume;
  