import React, { Component } from 'react'
import { BrowserRouter as Router,Route,Redirect } from 'react-router-dom';
import AdminLogin from './adminlogin';
import AdminLogout from './adminlogout';
import AdminSignup from './adminsignup';
import EmployeeRecord from './employeerecord';
import EmployeeAdd from './employeeadd';
import EmployeeApplication from './employeeapplication';
import EmployeeLogout from './employeelogout';
import EmployeeLogin from './employeelogin';
import ApplyLeave from './applyleave';
import {connect} from 'react-redux';
const PrivateRoute = ({ component:Component,...rest })=>
{
   if(rest.path==='/adminwelcome')
   {   
  return(<Route {...rest} render={(props) => (
    (rest.loginStatus)=== true ? <Component {...props} />: <Redirect to='/adminlogin' />
  )} />)
   }
   else
   {
    return(<Route {...rest} render={(props) => (
      (rest.loginStatusemp)=== true? <Component {...props} />: <Redirect to='/employeelogin' />
    )} />)
   }
}
 class AdminIndex extends Component 
 {
    render() 
    {
        return (          
            <Router>
                 
               <div>
         
                 <Route exact path="/">
                    <AdminSignup/>
                 </Route>

                 <Route  path="/adminlogin">
                    <AdminLogin />
                </Route>
              
                <PrivateRoute path="/adminwelcome" {...this.props} component={EmployeeRecord}/>
                
               
                <Route path="/adminlogout">
                  <AdminLogout/>
                </Route>
               
                <Route path="/employeeadd">
                   <EmployeeAdd/>
                </Route>
           
                <Route path="/employeeedit">
                    <EmployeeAdd/>
                </Route>
        
                
                <Route  path="/employeelogin">
                    <EmployeeLogin />
                </Route>
             
                <PrivateRoute path="/applyleave" {...this.props} component={ApplyLeave}/> 
                
                <Route path="/employeelogout">
                     <EmployeeLogout/>
                </Route>
                 
                <Route path="/employeeapplication">
                    <EmployeeApplication/>
                </Route>
           
         
                 
               </div>
            
          </Router>
        
        );
    }
}
function mapStateToProps(state)
 {
  const { islogin,maintoken,isloginemp } = state
  return { loginStatus: islogin, tokenizer: maintoken,loginStatusemp:isloginemp }
  }
  export default connect(mapStateToProps)(AdminIndex);