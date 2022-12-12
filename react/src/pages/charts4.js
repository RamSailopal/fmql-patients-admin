import React from 'react';
import ReactApexChart from 'react-apexcharts'
import axios from 'axios';
export default class ApexChart extends React.Component {
async getUsersData(){
        function getage(yr,mon,day) {
            var today = new Date();
            var birthDate = new Date(yr,mon,day);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
        const res = await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE%202', headers: {'origin': '*'} })
        console.log(res.data.results)
        var newarr = [];
        var newarr1 = [];
        var dob;
        var dateofbirth;
        var agecount = [];
        for (var i = 0; i < res.data.results.length; i++){
            dateofbirth = res.data.results[i].date_of_birth.value.replace("T00:00:00Z","");
            dob = dateofbirth.split("-");
            var yr=dob[0];
            var mon=dob[1];
            var day=dob[2];
            var age=getage(yr,mon,day);
            if (agecount[age]===undefined) {
                agecount[age] =1;
            }
            else {
                agecount[age] +=1;
            }
        }
        console.log(agecount);
        Object.keys(agecount).forEach(val => {
            newarr.push(val)
        });
        Object.values(agecount).forEach(val => {
            newarr1.push(val)
        });
        this.setState({loading:false, options: { labels: newarr }, series: newarr1, series1: [ { data: newarr1 } ], options1: { xaxis: { categories: newarr } } })
      }
componentDidMount(){
        this.getUsersData()
      }
    constructor(props) {
      super(props);
      this.state = {
        loading:true,
        series: [],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
        series1: [{
            data: []
          }],
          options1: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: [],
            }
        }
      };
    }

  

    render() {
            
        return (
            <div>
                <h1>Patients By Age</h1>
                <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={780} height={250} />
                <ReactApexChart options={this.state.options1} series={this.state.series1} type="bar" height={250} />
            </div>

            )
      }
    
}