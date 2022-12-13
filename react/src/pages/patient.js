import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import '../index.css';
const Patient = () => {
    const {id}=useParams();
    var arr=[];
    let jsonstr= async() => {
        var x= await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE%202-' + id });
        if (x.data.results !== undefined) {
            var y = await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE 9000001-' + id });
            arr = arr.concat(x.data.results[0]);
            arr = arr.concat(y.data.results[0].health_record_no)
            console.log(arr[1].value[0].health_record_no.value);
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
                <form id="msform">
                <img alt="" src={'https://randomuser.me/api/portraits/' + sx + '/' + data[0].uri.value.replace("2-","") + '.jpg'}/>
                <label>ID:
                <input
                    type="text" 
                    value={data[0].uri.value.replace("2-","")}
                    disabled="true"
                 />
                </label><br></br><br></br>
                <label>Name:
                <input
                    type="text" 
                    value={data[0].name.value}
                    disabled="true"
                    size="25"
                 />
                </label><br></br><br></br>
                <label>Hospital Number:
                <input
                    type="text" 
                    value={data[1].value[0].health_record_no.value}
                    disabled="true"
                    size="25"
                 />
                </label><br></br><br></br>
                <label>Sex:
                <input
                    type="text" 
                    value={data[0].sex.value}
                    disabled="true"
                 />
                </label><br></br><br></br>
                <label>Date of Birth:
                <input
                    type="text" 
                    value={data[0].date_of_birth.value.replace("T00:00:00Z","")}
                    disabled="true"
                 />
                </label><br></br><br></br>
                <label>Social Security Number:
                <input
                    type="text" 
                    value={data[0].social_security_number.value}
                    disabled="true"
                 />
                </label><br></br><br></br>
                <label>Place of Birth City:
                <input
                    type="text" 
                    value={data[0].place_of_birth_city.value}
                    disabled="true"
                 />
                </label><br></br><br></br>
                <label>Place of Birth State:
                <input
                    type="text" 
                    value={data[0].place_of_birth_state.sameAsLabel}
                    disabled="true"
                 />
                </label><br></br><br></br>
                <label>Zip Code:
                <input
                    type="text" 
                    value={data[0].zip4===undefined ? "" : data[0].zip4.value}
                    disabled="true"
                 />
                </label><br></br><br></br>
                <label>Occupation:
                <input
                    type="text" 
                    value={data[0].occupation===undefined ? "" : data[0].occupation.value}
                    disabled="true"
                 />
                 </label><br></br><br></br>
                <label>Phone number (residence):
                <input
                    type="text" 
                    value={data[0].phone_number_residence===undefined ? "" : data[0].phone_number_residence.value}
                    disabled="true"
                 />
                </label><br></br><br></br>
                <label>Phone number (Cell):
                <input
                    type="text" 
                    value={data[0].phone_number_cellular===undefined ? "" : data[0].phone_number_cellular.value}
                    disabled="true"
                 />
                </label><br></br><br></br>
                <label>Phone number (Work):
                <input
                    type="text" 
                    value={data[0].phone_number_work===undefined ? "" : data[0].phone_number_cellular.work}
                    disabled="true"
                 />
                </label><br></br><br></br>
                <label>Email Address:
                <input
                    type="text" 
                    value={data[0].email_address===undefined ? "" : data[0].email_address.value}
                    disabled="true"
                 />
                </label><br></br><br></br>
                </form>
                </fieldset>
                <br></br>
                </div>
               ,document.getElementById('root'));
        }
        if (data[0].zip4 !== undefined && data[0].zip4.value !== "") {
            ReactDOM.render(<iframe title="map" width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=-118.47149848937988%2C33.93335515776341%2C-118.41485023498537%2C33.950408878167416&amp;layer=mapnik&amp;marker=33.941882444999436%2C-118.44317436218262"></iframe>,document.getElementById('map'))
        }
        else {
            ReactDOM.render(
                <div>
                <p align="center">
                <h2 class="fs-title"><font color="red">WARNING</font></h2>
                <h2 class="fs-title"><font color="red">There is no zip code entered for this patient</font></h2>
                </p>
                <p align="center">
                <button onClick={() => document.getElementById('map').style="display:none"}>OK</button>
                </p>
                </div>
                ,document.getElementById('map'))
        }
        });
    return "";
};
export default Patient;
