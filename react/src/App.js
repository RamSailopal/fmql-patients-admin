import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table";
import 'react-table/react-table.css'

export default class App extends Component {
          constructor(props){
                      super(props)
                      this.state = {
                                    users: [],
                                    loading:true
                                  }
                    }
          async getUsersData(){
                      const res = await axios({url: process.env.REACT_APP_GITADD + '/fmqlEP?fmql=SELECT%202', headers: {'origin': '*'} })
                      console.log(res.data.results)
                      this.setState({loading:false, users: res.data.results})
                    }
          componentDidMount(){
                      this.getUsersData()
                    }
          render() {
                      const columns = [{
                                    Header: 'Patient',
                                    accessor: 'uri.label'
                                   }
                                ]
                      return (
                                    <ReactTable
                                    data={this.state.users}
                                    columns={columns}
                                 />
                                  )
                    }
}
