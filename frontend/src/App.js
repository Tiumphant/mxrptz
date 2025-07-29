import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./page/Home";
import Registration from "./page/Registration";
import Patient from "./page/Patient";
import PatientD from "./page/PatientD";
import PatientA from "./page/PatientA";
import PatientList from "./page/Patientlist";
import AppointmentD from "./page/AppointmentD";
import AppointmentA from "./page/AppointmentA";
import Appointmentlist from "./page/Appointmentlist";
import Role from "./page/Role";
import RoleA from "./page/RoleA";
import RoleD from "./page/RoleD";
import Rolelist from "./page/Rolelist";

import PatientDashboard from "./page/PatientDashboard";
import DoctorDashboard from "./page/DoctorDashboard";

import Login from "./page/Login";
import Appointment from "./page/Appointment";

function App() {
    return (
        <Router>
            {/* <Dashboard />  */}
            <Routes>
                <Route path="/patientdashboard" element={<PatientDashboard />} />
                <Route path="/doctordashboard" element={<DoctorDashboard />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/" element={<Home/>} />
                <Route path="/patient" element={<Patient />} />
                <Route path="/patient/:id" element={<Patient />} />
                <Route path="/patientD" element={<PatientD />} />
                <Route path="/PatientD/:id" element={<PatientD />} />
                <Route path="/patientA" element={<PatientA />} />
                <Route path="/patientA/:id" element={<PatientA />} />
                <Route path="/patientlist" element={<PatientList />} />
                <Route path="/appointmentA" element={<AppointmentA />} />
                  <Route path="/appointment" element={<Appointment />} />
                <Route path="/appointmentD" element={<AppointmentD />} />
                <Route path="/appointmentD/:id" element={<AppointmentD />} />
                <Route path="/appointmentlist" element={<Appointmentlist />} />
                <Route path="/role" element={<Role />} />
                <Route path="/roleA" element={<RoleA />} />
                <Route path="/roleA/:id" element={<RoleA />} />
                <Route path="/roleD/:id" element={<RoleD/>} />
                <Route path="/roleD" element={<RoleD />} />
                <Route path="/rolelist" element={<Rolelist />} />
                
            </Routes>
        </Router>
    );
}

export default App;