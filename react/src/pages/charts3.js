import React from 'react';
import ReactApexChart from 'react-apexcharts'
import axios from 'axios';
export default class ApexChart extends React.Component {
async getUsersData(){
        const res = await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE%202', headers: {'origin': '*'} })
        console.log(res.data.results)
        var newarr = [];
        var newarr1 = [];
        var occval;
        var occupationcount = [];
        for (var i = 0; i < res.data.results.length; i++){
            if(res.data.results[i].occupation===undefined) {
                occval = 'UNKNOWN';
            }
            else {
                occval = res.data.results[i].occupation.value
            }
            if (occupationcount[occval]===undefined) {
                occupationcount[occval]=1;
            }
            else {
                occupationcount[occval] +=1;
            }
        }
        Object.keys(occupationcount).forEach(val => {
            newarr.push(val)
        });
        Object.values(occupationcount).forEach(val => {
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
                <h1>Patients By Occupation</h1>
                <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={780} height={250} />
                <ReactApexChart options={this.state.options1} series={this.state.series1} type="bar" height={250} />
            </div>

            )
      }
    
}

