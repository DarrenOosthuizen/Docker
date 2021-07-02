import React from "react";
import "./Contact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";

function Contact() {
  return (
    <body className="conbody">
      <div className="contact" id="contact">
        <div className="container text-center contactcont">
          <h1>Contact Me</h1>
          <p className="text-center">
            Contact Information
            <br />
            Please feel free to contact me via any of the following
            <div className="row rowcont">
              <div className="col-md-4">
                <i class="fas fa-phone"></i>
                <p>
                  <a href="tel:+27 72 089 9534">+27 72 089 9534</a>
                </p>
              </div>
              <div className="col-md-4">
                <i class="far fa-envelope"></i>
                <p>
                  <a href="mailto:darren.oosthuizen295@gmail.com">
                    darren.oosthuizen295@gmail.com
                  </a>
                </p>
              </div>
              <div className="col-md-4">
                <i class="far fa-id-card"></i>
                <p>
                  <a href="http://darren.flystudio.co.za/ContactMe">
                    Fill in Contact Form
                  </a>
                </p>
              </div>
            </div>
          </p>
        </div>
      </div>
    </body>
  );
}

export default Contact;
