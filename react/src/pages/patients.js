import React from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import '../index.css';

export default class Patients extends React.Component {
          constructor(props){
                      super(props)
                      this.state = {
                                    users: [],
                                    loading:true
                                  }
                    }
          async getUsersData(){
                      const res = await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=DESCRIBE%202', headers: {'origin': '*'} })
                      console.log(res.data.results)
                      var newarr = [];
                      for (var i = 0; i < res.data.results.length; i++){
                          newarr.push({ 'ID' : res.data.results[i].uri.value.replace("2-",""), 'Name' : res.data.results[i].name.value.replace("PATIENT/",""), 'Sex' : res.data.results[i].sex.value, 'City' : res.data.results[i].place_of_birth_city.value, 'State' : res.data.results[i].place_of_birth_state.sameAsLabel, });
                      }
                      console.log(newarr)
                      this.setState({loading:false, users: newarr})
                    }
          componentDidMount(){
                      this.getUsersData()
                    }
          render() {
                      const columns = [
                                   {
                                    name: 'ID',
                                    selector: row => row.ID,
                                    sortable: 'true',
                                   },
                                   {
                                    name: 'Name',
                                    selector: row => row.Name,
                                    sortable: 'true',
                                   },
                                   {
                                    name: 'Sex',
                                    selector: row => row.Sex,
                                    sortable: 'true',
                                   },
                                   {
                                    name: 'City',
                                    selector: row => row.City,
                                    sortable: 'true',
                                   },
                                   {
                                    name: 'State',
                                    selector: row => row.State,
                                    sortable: 'true',
                                   },
                                   {
                                    name: '',
                                    cell: row => { let sx; if (row['Sex'] === "MALE") { sx="men" } else { sx="women" }; return <img alt="" src={'https://randomuser.me/api/portraits/' + sx + '/' + row['ID'] + '.jpg'} height="50" width="50" /> },
                                   },
                                ]
                      return (
                                    <DataTable
                                    data={this.state.users}
                                    columns={columns}
                                    pagination
                                    selectableRows
                                    onSelectedRowsChange={({ selectedRows }) => window.location = '/patient/' + selectedRows[0].ID}
                                    getTrProps={(state, rowInfo) => {
                                      if (rowInfo && rowInfo.row) {
                                        return {
                                          onClick: (e) => {
                                            window.location="patient/" + rowInfo.row['ID'];
                                          }
                                        }
                                      }else{
                                        return {}
                                      }
                                    }}
                                    
                                 />
                                  )
                    }
        
}