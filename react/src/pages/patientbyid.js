import React from 'react'
import ReactDOM from 'react-dom'
import '../index.css';
const PatientByID = () => {
    ReactDOM.render(
        <div class="formdiv">
            <h2>Patient By ID</h2>
            <label>ID:</label>
            <input type="text" name="id" id="id" style={{backgroundColor:'white'}}></input>
            <p align="center"><button onClick={() => window.location='patient/' + document.getElementById('id').value}>OK</button></p>
        </div>
           ,document.getElementById('root'));
    return "";
};
export default PatientByID;