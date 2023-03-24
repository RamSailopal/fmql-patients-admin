import axios from 'axios'
import { useParams } from 'react-router-dom';
const Patientname = () => {
    const {name}=useParams();
    var arr=[];
    let jsonstr= async() => {
        var x= await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE 2 FILTER (.01=' + name + ')' });
        if (x.data.results[0] !== undefined) {
            var y = await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE 9000001-' + x.data.results[0].uri.value.replace("2-","") });
            arr = arr.concat(x.data.results[0]);
            arr = arr.concat(y.data.results[0].health_record_no)
            console.log(arr[1].value[0].health_record_no.value);
        }
        return arr;

    }
    jsonstr().then((data)=> {
        window.location="/patient/" + data[0].uri.value.replace("2-","");
        });
    return "";
};
export default Patientname;