import React from 'react';
import ReactApexChart from 'react-apexcharts'
import axios from 'axios';
export default class ApexChart extends React.Component {
async getUsersData(){
        const res = await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE%202', headers: {'origin': '*'} })
        console.log(res.data.results)
        var newarr = [];
        var newarr1 = [];
        var sexcount = [];
        for (var i = 0; i < res.data.results.length; i++){
            if (sexcount[res.data.results[i].sex.value]===undefined) {
                sexcount[res.data.results[i].sex.value]=1;
            }
            else {
                sexcount[res.data.results[i].sex.value] +=1;
            }
        }
        Object.keys(sexcount).forEach(val => {
            newarr.push(val)
        });
        Object.values(sexcount).forEach(val => {
            newarr1.push(val)
        });
        this.setState({loading:false, options: { labels: newarr }, series: newarr1, series1: [ { data: newarr1 } ], options1: { xaxis: { categories: newarr } }})
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
                    <h1>Patients By Sex</h1>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={250} height={700} />
                    <ReactApexChart options={this.state.options1} series={this.state.series1} type="bar" height={250} />
                </div>
        )
      }
    
}

