import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import '../index.css';
const Patient = () => {
    const {id}=useParams();
    var arr=[];
    function getmaxdate() {
        const date = new Date();
        const day=date.getDate();
        const mn=date.getMonth()+1;
        const yr=date.getFullYear();
        return String(yr) + "-" + String(mn) + "-" + String(day);
    }
    function proczip() {
        document.getElementById('map').style="display:none"; 
        document.getElementById('zip').focus();
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
        var x= await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE%202-' + id });
        if (x.data.results !== undefined) {
            var y = await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE 9000001-' + id });
            arr = arr.concat(x.data.results[0]);
            if (y.data.results !== undefined) {
                arr = arr.concat(y.data.results[0].health_record_no)
                var z = await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=SELECT 5' });
                if (z.data.results !== undefined) {
                    arr = arr.concat(z.data);
                }
            }
            if (x.data.results[0].zip4 !== undefined) {
                var za = await axios({url: process.env.REACT_APP_ZIPADD + '/zip?zip=' + x.data.results[0].zip4.value});
                if (za.data[0] !== undefined) {
                    arr = arr.concat(za.data[0]);
                    console.log(arr);
                }
            }
        }
        return arr;
    }
    jsonstr().then((data)=> {
        function cliked() {
            document.getElementById('root').style="display:none";
            window.location="/patients";
          }
        if (data[0] === undefined) {
            ReactDOM.render(
                <div class="errordiv">
                <p align="center">
                <h2 class="fs-title"><font color="red">ERROR</font></h2>
                <h2 class="fs-title"><font color="red">No Details Found for ID number {id} </font></h2>
                </p>
                <p align="center">
                <button onClick={cliked}>OK</button>
                </p>
                </div>
                ,document.getElementById('root'));
        }
        else {
            let sx;
            if (data[0].sex.value === "MALE") {
                sx="men"
            }
            else {
                sx="women"
            }
            ReactDOM.render(
                <div>
                <fieldset class="fieldset">
                <img alt="" src={'https://randomuser.me/api/portraits/' + sx + '/' + data[0].uri.value.replace("2-","") + '.jpg'}/>
                <label>ID:
                <input
                    id="id"
                    type="text" 
                    value={data[0].uri.value.replace("2-","")}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Name:
                <input
                    id="name"
                    type="text" 
                    defaultValue={data[0].name.value}
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
                    defaultValue={data[1] !== undefined ? data[1].value[0].health_record_no.value : ""}
                    disabled={false}
                    size="25"
                 />
                </label><br></br>
                <input type="text" id="hosnerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <br></br>
                
                <label>Sex:
                <select id="sex">
                    <option id="M" selected={data[0].sex.value === "MALE" ? "selected" : ""}>Male</option>
                    <option id="F" selected={data[0].sex.value === "FEMALE" ? "selected" : ""}>Female</option>
                </select>
               
                </label><br></br><br></br>
                <label>Date of Birth:
                <input
                    type="date" 
                    max={getmaxdate()}
                    id="dob"
                    defaultValue={data[0].date_of_birth !== undefined ? data[0].date_of_birth.value.replace("T00:00:00Z","") : ""}
                    disabled={false}
                 />
                </label><br></br>
                <input type="text" id="doberror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <br></br>
                <label>Social Security Number:
                <input
                    id="ssn"
                    type="text" 
                    defaultValue={data[0].social_security_number !== undefined ? data[0].social_security_number.value : ""}
                    disabled={false}
                 />
                </label><br></br>
                <input type="text" id="ssnerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <br></br>
                <label>Place of Birth City:
                <input
                    type="text" 
                    id="city"
                    defaultValue={data[0].place_of_birth_city.value}
                    disabled={false}
                 />
                </label><br></br>
                <input type="text" id="cityerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <br></br>
                <label>Place of Birth State:
                 <select id="state">
                 {
                    data[2].results.map((states) => 
                        <option id={states.uri.value.replace("5-","")} selected={data[0].place_of_birth_state.value === states.uri.value ? "selected" : ""}>{states.uri.sameAsLabel}</option>
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
                    defaultValue={data[0].zip4===undefined ? "" : data[0].zip4.value}
                    disabled={false}
                 />
                </label><br></br>
                <br></br>
                <input type="text" id="ziperror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <label>Occupation:
                <input
                    type="text" 
                    id="occupation"
                    defaultValue={data[0].occupation===undefined ? "" : data[0].occupation.value}
                    disabled={false}
                 />
                 </label><br></br>
                 <br></br>
                <input type="text" id="occupationerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <label>Phone number (residence):
                <input
                    id="residence"
                    type="text" 
                    defaultValue={data[0].phone_number_residence===undefined ? "" : data[0].phone_number_residence.value}
                    disabled={false}
                 />
                </label><br></br>
                <br></br>
                <input type="text" id="residenceerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <label>Phone number (Cell):
                <input
                    id="cell"
                    type="text" 
                    defaultValue={data[0].phone_number_cellular===undefined ? "" : data[0].phone_number_cellular.value}
                    disabled={false}
                 />
                </label><br></br>
                <br></br>
                <input type="text" id="cellerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <label>Phone number (Work):
                <input
                    id="work"
                    type="text" 
                    defaultValue={data[0].phone_number_work===undefined ? "" : data[0].phone_number_work.value}
                    disabled={false}
                 />
                </label><br></br>
                <input type="text" id="workerror" defaultValue="" disabled={true} style={{color:'red', fontSize: '80%'}}/><br></br>
                <label>Email Address:
                <input
                    id="email"
                    type="text" 
                    defaultValue={data[0].email_address===undefined ? "" : data[0].email_address.value}
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
        }
        if (data[0].zip4 !== undefined && data[0].zip4.value !== "") {
            ReactDOM.render(<iframe title="map" width="425" height="350" frameborder="0" scrolling="no" marginHeight="0" marginWidth="0" src={"https://www.openstreetmap.org/export/embed.html?bbox=" + data[3].long + "%2C" + data[3].lat + "%2C" + data[3].long + "%2C" + data[3].lat + "&amp;layer=mapnik&amp;marker=" + data[3].long + "%2C" + data[3].lat}></iframe>,document.getElementById('map'))
        }
        else {
            ReactDOM.render(
                <div>
                <p align="center">
                <h2 class="fs-title"><font color="red">WARNING</font></h2>
                <h2 class="fs-title"><font color="red">There are fields that need to be filled</font></h2>
                </p>
                <p align="center">
                <button onClick={proczip}>OK</button>
                </p>
                </div>
                ,document.getElementById('map'))
        }
        });
    return "";
};
export default Patient;
