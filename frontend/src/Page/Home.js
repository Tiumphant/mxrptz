import React from "react";
import { Link } from "react-router-dom";
import doctorImage from "../page/doctor.jpg";
import neurology from "../page/neurology.jpeg";
import cardiology from "../page/cardiology.jpg";
import orthopadic from "../page/orthepadic.png";
import Gynecology from "../page/Gynecology.jpeg";
import pmanagment from "../page/pmanagment.jpg";
import paymentmanagment from "../page/paymentmanagment.webp";
import labmanagment from "../page/labmanagment.jpeg";
import pharmecymanagment from "../page/pharmecymanagment.jpg";
import Pediatrics from "../page/Pediatrics.jpg";
import Emergency from "../page/Emergency.jpeg";
import PatientDashboard from "./PatientDashboard";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <>
    <PatientDashboard/>
      <section className="hero">
        <div className="container">
          <div className="content">
            <h1 className="design">Health Care</h1>
            <p>
              The goal of this Hospital Management System is to digitize and automate hospital workflows, reducing paperwork, eliminating errors, and enhancing the patient experience.
            </p>
            <Link to="/appointment">
              <button className="btn-primary">Book an Appointment</button>
            </Link>
          </div>
          <div className="image-container">
            <img src={doctorImage} alt="Doctor" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
