import React from 'react';
import ReactDOM from 'react-dom';
import Patients from './pages/patients.js';
import Charts from './pages/charts.js';
import Charts1 from './pages/charts1.js';
import Charts2 from './pages/charts2.js';
import Charts3 from './pages/charts3.js';
import Charts4 from './pages/charts4.js';
import NoPage from './pages/nopage.js';
import Patient from './pages/patient.js';
import PatientByName from './pages/patientbyname.js';
import PatientBySSN from './pages/patientbyssn.js';
import Patientname from './pages/patientname.js';
import Patientssn from './pages/patientssn.js';
import PatientByID from './pages/patientbyid.js';
import Home from './pages/home.js';
import AppMenu from './menu/menu.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="patients" element={<Patients />} />
          <Route path="*" element={<NoPage />} />
          <Route path="patient/:id" element={<Patient />} />
          <Route path="patientname/:name" element={<Patientname />} />
          <Route path="patientssn/:ssn" element={<Patientssn />} />
          <Route path="patientsbycity" element={<Charts />} />
          <Route path="patientsbystate" element={<Charts2 />} />
          <Route path="patientsbysex" element={<Charts1 />} />
          <Route path="patientsbyoccupation" element={<Charts3 />} />
          <Route path="patientsbyage" element={<Charts4 />} />
          <Route path="patientbyname" element={<PatientByName />} />
          <Route path="patientbyssn" element={<PatientBySSN />} />
          <Route path="patientbyid" element={<PatientByID />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <App />
  ,document.getElementById('root')
);

ReactDOM.render(
  <div>
    <img alt="" src="https://raw.githubusercontent.com/RamSailopal/fmql-patients-admin/main/react/public/Cloudvista.png" height={200} width={400}/>
    <br></br>
    <br></br>
    <AppMenu />
  </div>
  ,document.getElementById('root1')
);

