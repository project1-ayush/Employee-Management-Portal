import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
class EmployeeLogout extends Component 
{
   
    render() {
        this.props.dispatch({type:'EmployeeLogin_failure'})
        return (
            <div>
                <h1>
                    You have been logged out!
                </h1>
                
                <Link to='/employeelogin'>Employee Login  Again</Link>
            
                
            </div>
        )
    }
}

function mapStateToProps(state) {
  
 
     const { isloginemp,maintoken } = state
     
     return { loginStatusemp: isloginemp, tokenizer: maintoken }
     }
     
   export default connect(mapStateToProps)(EmployeeLogout);