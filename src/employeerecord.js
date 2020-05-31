
import React from 'react';

import { Button,Table } from 'react-bootstrap';
import {
  Link
  
} from "react-router-dom";

import {connect} from 'react-redux';
import { withRouter } from 'react-router';
  
class EmployeeRecord extends React.Component
{
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        employees: [],
      
        response:{}
        
         
      }
    } 
  
         componentDidMount()
              {
                let apiUrl="";
                
          
                if(!(this.props.countdata))
                {
                  apiUrl = 'http://127.0.0.1:5000/lms/employeeDetails';
                 
                
                                     fetch(apiUrl,
                                    {
                                        method: 'GET',                                             
                                                headers:{ 
                                                    'Content-Type': 'application/json',
                                                   'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOjEyMzR9.AkulsG22blITRUe4-iROKG25EIqT8H2-5HXLT93nQXc' 
                                                   }
                                    })
                                  .then(res => res.json())
                                  .then(
                                    (response) => {
                                      if(response.success)
                                      {
                                        this.props.dispatch({type:'Employee_data',
                                                              payload:response.data})
                                      }
                                     
                                    }
                                    
                                  )
                                  }              
          }
        
         
         
         editEmployee=(employee)=>
         {
           this.props.history.push({
             pathname: '/employeeedit/'+employee.qci_id,
           
             })
         }
         addEmployee=()=>
         {
           this.props.history.push({
             pathname: '/employeeadd/'
             })
         }
      
    deleteEmployee(qciid)
    {
  
    const apiUrl = 'http://127.0.0.1:5000/lms/deleteEmployee';
  
    fetch(apiUrl,
      {
          method: 'POST',
          headers:{ 
                    'Content-Type': 'application/json',
                     'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOjEyMzR9.AkulsG22blITRUe4-iROKG25EIqT8H2-5HXLT93nQXc' 
                     },
                     body: JSON.stringify({    
                      "qci_id":qciid
                     
                       })
      })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.success)
        {
          this.props.dispatch({type:'Employee_delete',
                              payload:qciid})
       
        }
      }
     
    )
           }
    render() 
    {
     console.log(this.props.data1);
      return(
      
          <div>
             
          <h1>This is Employee Record  page.</h1>
        <ul>
          <li>
            <Link to="/employeelogin">EmployeeLogin</Link>
          </li>
          <li>
            <Link to="/employeeapplication">Employee Application</Link>
          </li>
         
          <li>
          <Link to="/adminlogout">Admin Logout</Link>
          </li>
         
       
        </ul>
     
            <h2>Employee List</h2>
            <br></br>
            <Button  onClick={()=> this.addEmployee()} variant="danger">AddEmployee</Button>
            <Table striped bordered hover variant="dark">
              <thead>
                

                <tr>
                  <th>qci_id</th>
                  <th>name</th>
                  <th>email</th>
                  <th>board</th>
                  <th>designation</th>
                  <th>type_of_employee</th>
                  <th>gender</th>
                  
                </tr>
              </thead>
              <tbody>
              
                {(this.props.data1).map(employee => (
                  <tr key={employee.qci_id}>
                    <td>{employee.qci_id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.board}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.type_of_employee}</td>
                    <td>{employee.gender}</td>
                    <td>
                    <Button onClick={() => this.editEmployee(employee)} variant="primary">Edit</Button>
                     </td><td>
                  <Button onClick={() => this.deleteEmployee(employee.qci_id)} variant="danger">Delete</Button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )
      }
    }
  
  
    function mapStatetoProps(state)
     {
     
        const {employ,count}=state;
    
        return {data1:employ,
                countdata:count};
        }
        
        export default withRouter(connect(mapStatetoProps)(EmployeeRecord));
 