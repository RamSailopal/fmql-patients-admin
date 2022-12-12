import React from 'react'
import ReactDOM from 'react-dom'
import '../index.css';
const PatientByName = () => {
    ReactDOM.render(
        <div class="formdiv">
            <h2>Patient By Name</h2>
            <label>Name:</label>
            <input type="text" name="name" id="name" size="9" style={{backgroundColor:'white'}}></input>
            <p align="center"><button onClick={() => window.location='patientname/' + document.getElementById('name').value}>OK</button></p>
        </div>
           ,document.getElementById('root'));
    return "";
};
export default PatientByName;