import { createRoot } from 'react-dom/client';
import axios from 'axios'
import { useParams } from 'react-router-dom';
const Patientssn = () => {
    const container = document.getElementById('root');
    const root = createRoot(container);
    const {ssn}=useParams();
    var arr=[];
    let jsonstr= async() => {
        var x= await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE 2 FILTER (.09=' + ssn + ')' });
        if (x.data.results[0] !== undefined) {
            var y = await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE 9000001-' + x.data.results[0].uri.value.replace("2-","") });
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
            root.render(
                <div class="errordiv">
                <p align="center">
                <h2 class="fs-title"><font color="red">ERROR</font></h2>
                <h2 class="fs-title"><font color="red">No Details Found for social security number {ssn} </font></h2>
                </p>
                <p align="center">
                <button onClick={cliked}>OK</button>
                </p>
                </div>
                );
        }
        else {
            let sx;
            if (data[0].sex.value === "MALE") {
                sx="men"
            }
            else {
                sx="women"
            }
            root.render(
                <fieldset>
                <form>
                <img alt="" src={'https://randomuser.me/api/portraits/' + sx + '/' + data[0].uri.value.replace("2-","") + '.jpg'}/>
                <label>ID:
                <input
                    type="text" 
                    value={data[0].uri.value.replace("2-","")}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Name:
                <input
                    type="text" 
                    value={data[0].name.value}
                    disabled={true}
                    size="25"
                 />
                </label><br></br><br></br>
                <label>Hospital Number:
                <input
                    type="text" 
                    value={data[1].value[0].health_record_no.value}
                    disabled={true}
                    size="25"
                 />
                </label><br></br><br></br>
                <label>Sex:
                <input
                    type="text" 
                    value={data[0].sex.value}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Date of Birth:
                <input
                    type="text" 
                    value={data[0].date_of_birth.value.replace("T00:00:00Z","")}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Social Security Number:
                <input
                    type="text" 
                    value={data[0].social_security_number.value}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Place of Birth City:
                <input
                    type="text" 
                    value={data[0].place_of_birth_city.value}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Place of Birth State:
                <input
                    type="text" 
                    value={data[0].place_of_birth_state.sameAsLabel}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Zip Code:
                <input
                    type="text" 
                    value={data[0].zip4===undefined ? "" : data[0].zip4.value}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Occupation:
                <input
                    type="text" 
                    value={data[0].occupation===undefined ? "" : data[0].occupation.value}
                    disabled={true}
                 />
                 </label><br></br><br></br>
                <label>Phone number (residence):
                <input
                    type="text" 
                    value={data[0].phone_number_residence===undefined ? "" : data[0].phone_number_residence.value}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Phone number (Cell):
                <input
                    type="text" 
                    value={data.phone_number_cellular===undefined ? "" : data.phone_number_cellular.value}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Phone number (Work):
                <input
                    type="text" 
                    value={data[0].phone_number_work===undefined ? "" : data[0].phone_number_cellular.work}
                    disabled={true}
                 />
                </label><br></br><br></br>
                <label>Email Address:
                <input
                    type="text" 
                    value={data[0].email_address===undefined ? "" : data[0].email_address.value}
                    disabled={true}
                 />
                </label><br></br><br></br>
                </form>
                </fieldset>
               );
        }
        });
    return "";
};
export default Patientssn;