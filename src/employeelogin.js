
import React from 'react';

import { BrowserRouter as Router, Link ,Route,Redirect } from 'react-router-dom';

import { Form,Button,Row,Col} from 'react-bootstrap';
import {connect} from 'react-redux';
class EmployeeLogin extends React.Component 
{
    constructor(props)
     {
      super(props);
      this.state = {
          qci_id:'',
          qci_idError:'',
          passwordError:'',
          password:'',
          mess:'',
          succ:'',
       
        };
     }
     valid()
     {
      if((this.state.password.length<5))
       {
         
        this.setState({passwordError:"Password length should be greater than 5"})
       }
       else if((isNaN(this.state.qci_id)))
       {
        
        this.setState({qci_idError:"qci_id should be number"})
       }
       else if(this.state.password.length<5 && (!(isNaN(this.state.qci_id))))
      {
        
       this.setState({qci_idError:"qciid should be number",passwordError:"Password length shud be greater than 5"})
      }
      else
      {
         return true;
         
      }
   }


    
  

     handleChange = event => {
                                  this.setState({ [event.target.name]:event.target.value })
                             }
     handleSubmit = event =>
               {
                                
                                 const yrl ="http://127.0.0.1:5000/lms/loginEmp"

                                 const data = { 
                                      qci_id:this.state.qci_id,
                                      password:this.state.password
                                     }

                                     if(this.valid())
                                     {
                                       
                                 fetch(yrl,
                                 { 
                                 method: 'POST',
                                 body: JSON.stringify(data), // data can be `string` or {object}!
                                 headers:{ 
                                     'Content-Type': 'application/json',
                                    'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOjEyMzR9.AkulsG22blITRUe4-iROKG25EIqT8H2-5HXLT93nQXc' 
                                    }
                                 })
                                 .then(res => res.json())
                                 .catch(error => console.error('Error:', error))
                                 .then(response =>{
                                    
                                 
                                     if((response.success))
                                     {
                                       this.props.dispatch({type:'EmployeeLogin_success',payload:response.token})
                                       console.log("after dispatch");
                                      }
                                      this.setState({mess:response.message}) 
                                  
                                 }); 
                                 
                                }     
                    
                }
                                render()
                                  {    
                              
                                    console.log(this.props.loginStatusemp)
                                    if(this.props.loginStatus)
                                    {                                   
                                      return <Redirect to="/applyleave"/>
                                    }
                                 
                             
                                 return(
                                   
                                  <div>
                                    <Form>
                                    <h3>Employee Login</h3>
                                  <Row>
                                   
                                    <Col>
                                    <Form.Label>Qci_id</Form.Label>
                                      <Form.Control type="number"  size="sm"  name="qci_id"  placeholder="Enter qci_id" onChange={this.handleChange} />
                                    </Col>
                                
                                  </Row>
                                  <br></br>
                                  <Row>
                                  
                                    <Col>
                                    <Form.Label>Password</Form.Label>
                                      <Form.Control type="password" size="sm" name="password"  placeholder="Enter password"   onChange={this.handleChange} />
                                    </Col>
                                  </Row>
                                  <br></br>
                                  <Button  onClick={()=> this.handleSubmit()} variant="primary">Submit</Button>
                                    
                                    <br></br>
                              
                                    {this.state.qci_idError} {this.state.passwordError} <br></br>
                                    {this.state.mess}                 
  </Form> 
 

  </div>
                                  )
                                  }
}

export default connect(mapStateToProps)(EmployeeLogin);

function mapStateToProps(state) {

 
   const { maintoken,isloginemp } = state
   
   return {  tokenizer: maintoken,loginStatus:isloginemp  }
   }
   