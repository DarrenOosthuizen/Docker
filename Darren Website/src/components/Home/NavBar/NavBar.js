import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { NavLink } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import CVImage from "../../../resources/images/Portrait.png";
import CVImage2 from "../../../resources/images/Portrait2.png";
import Logo from "../../../resources/images/DarrenLogo.png";

import { Modal, Button} from "react-bootstrap";

import TextField from "@material-ui/core/TextField";

class EmailModal extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(fieldName) {
    return function (event) {
      console.log(this.state.input);
      let input = this.state.input;
      input[event.target.name] = event.target.value;
      this.validate();
      this.setState({
        input,
      });
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      let input = {};
      input["Email"] = "";
      this.setState({ input: input });

const requestOptionsCustomer2 = {
        method: "POST",
        headers: {
          to: this.state.input.Email,
        },
      };
      fetch("https://email.flystudio.co.za:/sendCVEmail", requestOptionsCustomer2)
        .then((response) => response.json())
        .then((data) => this.setState({ postId: data.id }));
    }
  }
  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["Email"]) {
      isValid = false;
      errors["Email"] = "Please enter your Email Address!";
    }

    if (typeof input["Email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input["Email"])) {
        isValid = false;
        errors["Email"] = "Please enter valid Email Address!";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }
  render() {
    return (
      <form>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Email CV
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Please insert your email address below to have my CV emailed to
              you.
            </p>
            <div className="text-danger mb-3">{this.state.errors.Email}</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend"></div>
              <TextField
                id="filled-basic Email"
                label="Email Address"
                variant="outlined"
                required
                name="Email"
                className="form-control lblHeader"
                size="small"
                color="secondary"
                onChange={this.handleChange("Email").bind(this)}
                value={this.state.input.Email || ""}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <Button onClick={this.handleSubmit}>Send Email</Button>
          </Modal.Footer>
        </Modal>
      </form>
    );
  }
}

function NavBar() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <body>
      <section id="header">
        <div className="container text-center">
          <div class="user-box">
            <picture>
              <source media="(min-width : 601px)" srcSet={CVImage2}></source>
              <source media="(max-width : 600px)" srcSet={CVImage}></source>
              <img src={CVImage} alt="CoverImage"></img>
            </picture>
            <h1>Darren Oosthuizen</h1>
            <p>Software Engineer Undergraduate</p>
          </div>
        </div>
        <div className="scroll-btn">
          <div className="scroll-bar">
            <a href="./">
              <span></span>
            </a>
          </div>
        </div>
      </section>
      <div class="nav-bar">
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <NavLink to="/" class="navbar-brand" href="#">
              <img src={Logo} alt="logo" />
            </NavLink>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fa fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <NavLink to="/" class="nav-link active">
                    HOME
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/AboutMe" class="nav-link ">
                    ABOUT ME
                  </NavLink>
                </li>
                <li class="nav-item resumedrop">
                  <p class="nav-link resumep">
                    RESUME <i class="fa fa-caret-down"></i>
                  </p>
                  <div class="dropdown-content">
                    <a href="../downloads/DarrenOosthuizenCV.pdf" download>
                      Download PDF
                    </a>
                    <a onClick={() => setModalShow(true)}>Email CV</a>
                  </div>
                </li>
                <li class="nav-item resumedrop">
                  <p class="nav-link resumep">
                    WORK <i class="fa fa-caret-down"></i>
                  </p>
                  <div class="dropdown-content">
                    <NavLink to="/Work/Projects" className="normal">
                      PROJECTS
                    </NavLink>
                    <NavLink to="/Work/Courses" className="normal">
                      COURSES
                    </NavLink>
                  </div>
                </li>
                <li class="nav-item">
                  <NavLink to="/" class="nav-link ">
                    TRANSCRIPTS
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <EmailModal show={modalShow} onHide={() => setModalShow(false)} />
    </body>
  );
}

export default NavBar;
