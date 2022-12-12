import React from 'react'
import ReactDOM from 'react-dom'
import '../index.css';
const PatientBySSN = () => {
        ReactDOM.render(
            <div class="formdiv">
                 <h2>Patient By Social Security Number</h2>
                <label>Social Security Number:</label>
                <input type="text" name="ssn" id="ssn" style={{backgroundColor:'white'}}></input>
                <p align="center"><button onClick={() => window.location='patientssn/' + document.getElementById('ssn').value}>OK</button></p>
            </div>
               ,document.getElementById('root'));
    return "";
};
export default PatientBySSN;