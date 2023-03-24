import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import '../index.css';
const Newpatient = () => {
    function getmaxdate() {
        const date = new Date();
        const day=date.getDate();
        const mn=date.getMonth()+1;
        const yr=date.getFullYear();
        return String(yr) + "-" + String(mn) + "-" + String(day);
    }
    function reseterr(err) {
        if (document.getElementById(err)!==null) {
            document.getElementById(err).value="";
        }
    }
    function savezip() {
        var dob1=document.getElementById('dob').value.split("-");
        var yr=dob1[0];
        var mn=dob1[1];
        var dy=dob1[2];
        var sdob='2' + yr.substr(2,3) + mn + dy;
        var err=0;
        if (document.getElementById('occupation').value.length < 1) {
            document.getElementById("occupationerror").value="Occupation cannot be less the 1 in length";
            err=1;
        }
        if (document.getElementById('occupation').value.length > 30) {
            document.getElementById("occupationerror").value="Occupation cannot be greater than 30 in length";
            err=1;
        }
        if (/^\d{5}$/.test(document.getElementById('zip').value) !== true) {
            document.getElementById("ziperror").value="Zip code should be 5 digits";
            err=1;
        }
        if (document.getElementById('city').value.length < 2) {
            document.getElementById("cityerror").value="City cannot be less the 2 in length";
            err=1;
        }
        if (document.getElementById('city').value.length > 20) {
            document.getElementById("cityerror").value="City cannot be greater than 20 in length";
            err=1;
        }
        if (document.getElementById('work').value.length < 4) {
            document.getElementById("workerror").value="Work phone number cannot be less the 2 in length";
            err=1;
        }
        if (document.getElementById('work').value.length > 20) {
            document.getElementById("workerror").value="Work phone number cannot be greater than 20 in length";
            err=1;
        }
        if (document.getElementById('cell').value.length < 4) {
            document.getElementById("cellerror").value="Cell phone number cannot be less the 2 in length";
            err=1;
        }
        if (document.getElementById('cell').value.length > 20) {
            document.getElementById("cellerror").value="Cell phone number cannot be greater than 20 in length";
            err=1;
        }
        if (document.getElementById('residence').value.length < 4) {
            document.getElementById("residenceerror").value="Residential phone number cannot be less the 2 in length";
            err=1;
        }
        if (document.getElementById('residence').value.length > 20) {
            document.getElementById("residenceerror").value="Residential number cannot be greater than 20 in length";
            err=1;
        }
        if (document.getElementById('hos').value.length < 9) {
            document.getElementById("hoserror").value="Hospital number must be 9 digits";
            err=1;
        }
        if (document.getElementById('hos').value.length > 20) {
            document.getElementById("hoserror").value="Hospital number must be 9 digits";
            err=1;
        }
        if (document.getElementById('ssn').value.length < 9) {
            document.getElementById("ssnerror").value="Social security number must be 9 digits";
            err=1;
        }
        if (document.getElementById('ssn').value.length > 20) {
            document.getElementById("ssnerror").value="Social security number must be 9 digits";
            err=1;
        }
        //
        // Validate email address through regex
        //
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if ( ! document.getElementById('email').value.match(emailRegex)) {
            document.getElementById("emailerror").value="Email address is not in the correct format";
            err=1
        }
        if (err===0) {
            const data = {
                id: document.getElementById('id').value,
                zip: document.getElementById('zip').value,
                name: document.getElementById('name').value,
                occupation: document.getElementById('occupation').value,
                city: document.getElementById('city').value,
                residence: document.getElementById('residence').value,
                work: document.getElementById('work').value,
                cell: document.getElementById('cell').value,
                email: document.getElementById('email').value,
                sex: document.getElementById('sex').options[document.getElementById('sex').selectedIndex].id,
                dob: sdob,
                state: document.getElementById('state').options[document.getElementById('state').selectedIndex].id,
                ssn: document.getElementById('ssn').value,
                hos: document.getElementById('hos').value
            };
            axios.post(process.env.REACT_APP_GITADD + '/patdet', data)
            .then((res) => {
                console.log(`Status: ${res.status}`);
                console.log('Body: ', res.data);
                window.location='/patient/' + document.getElementById('id').value
            }).catch((err) => {
                console.error(err);
            });
        }
    }
    let jsonstr= async() => {
        var arr = [];
        var x= await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=COUNT 2' });
        if (x.data.results !== undefined) {
            arr = arr.concat(x.data);
            var z = await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=SELECT 5' });
            if (z.data.results !== undefined) {
                arr = arr.concat(z.data);
            }
        }
        console.log(arr);
        return arr;
    }
    jsonstr().then((data)=> {
       
            ReactDOM.render(
                <div>
                <fieldset class="fieldset">
                <label>ID:
                <input
                    id="id"
                    type="text" 
                    value={parseInt(data[0].count)+1}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Name:
                <input
                    id="name"
                    type="text" 
                    defaultValue=""
                    disabled={false}
                    size="25"
                 />
                </label><br></br>
                <input type="text" id="nameerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <br></br>
                <label>Hospital Number:
                <input
                    id="hos"
                    type="text" 
                    defaultValue=""
                    disabled={false}
                    size="25"
                 />
                </label><br></br>
                <input type="text" id="hosnerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <br></br>
                
                <label>Sex:
                <select id="sex">
                    <option id="M">Male</option>
                    <option id="F">Female</option>
                </select>
               
                </label><br></br><br></br>
                <label>Date of Birth:
                <input
                    type="date" 
                    max={getmaxdate()}
                    id="dob"
                    defaultValue=""
                    disabled={false}
                 />
                </label><br></br>
                <input type="text" id="doberror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <br></br>
                <label>Social Security Number:
                <input
                    id="ssn"
                    type="text" 
                    defaultValue=""
                    disabled={false}
                 />
                </label><br></br>
                <input type="text" id="ssnerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <br></br>
                <label>Place of Birth City:
                <input
                    type="text" 
                    id="city"
                    defaultValue=""
                    disabled={false}
                 />
                </label><br></br>
                <input type="text" id="cityerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <br></br>
                <label>Place of Birth State:
                <select id="state">
                 {
                    data[1].results.map((states) => 
                        <option id={states.uri.value.replace("5-","")}>{states.uri.sameAsLabel}</option>
                    )
                }
                </select>
                </label><br></br>
                <br></br>
                <input type="text" id="stateerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <label>Zip Code:
                <input
                    id="zip"
                    type="text" 
                    defaultValue=""
                    disabled={false}
                 />
                </label><br></br>
                <br></br>
                <input type="text" id="ziperror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <label>Occupation:
                <input
                    type="text" 
                    id="occupation"
                    defaultValue=""
                    disabled={false}
                 />
                 </label><br></br>
                 <br></br>
                <input type="text" id="occupationerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <label>Phone number (residence):
                <input
                    id="residence"
                    type="text" 
                    defaultValue=""
                    disabled={false}
                 />
                </label><br></br>
                <br></br>
                <input type="text" id="residenceerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <label>Phone number (Cell):
                <input
                    id="cell"
                    type="text" 
                    defaultValue=""
                    disabled={false}
                 />
                </label><br></br>
                <br></br>
                <input type="text" id="cellerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <label>Phone number (Work):
                <input
                    id="work"
                    type="text" 
                    defaultValue=""
                    disabled={false}
                 />
                </label><br></br>
                <input type="text" id="workerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <label>Email Address:
                <input
                    id="email"
                    type="text" 
                    defaultValue=""
                    disabled={false}
                    onfocus={reseterr("emailerr")}
                 />
                </label><br></br>
                <input type="text" id="emailerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/>
                <br></br>
                <br></br>
                <button id="save" onClick={savezip}>Save</button>
                </fieldset>
                <br></br>
                </div>
               ,document.getElementById('root'));
        });
    return "";
};
export default Newpatient;