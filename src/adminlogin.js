
import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Link ,Route,Redirect } from 'react-router-dom';
import { Form,Button,Row,Col} from 'react-bootstrap';
class AdminLogin extends React.Component 
{
    constructor(props)
     {
      super(props);
      this.state = {
         
          email:'',
          password:'',
         
          passwordError:'',
          emailError:'',
          mess:''
       
        };
     }
     valid()
  
    {
        
      
      if(!(this.state.email.includes("@")))
      {
      this.setState({emailError:"Invalid email"})
      }
      else if((this.state.password.length<5))
      {
       this.setState({passwordError:"Password length should be greater than 5"})
      }
      else if(!this.state.email.includes("@") && this.state.password.length<5)
     {
      this.setState({nameError:"Invalid name",passwordError:"Password length shud be greater than 5",emailError:"Email shud include @"})
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
                          
                                 const url ="http://127.0.0.1:5000/lms/loginAdmin"

                                 const data = { 
                                     name:this.state.name,
                                      email:this.state.email,
                                      password:this.state.password
                                      
                                     }
                                  
                                 

                                     if(this.valid())
                                 {
                                 fetch(url,
                                 { 
                                 method: 'POST',
                                 body: JSON.stringify(data),
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
                                          this.props.dispatch({type:'AdminLogin_success',payload:response.token})
                                        
                                         }
                                         this.setState({mess:response.message})
                                        
                                 }); 
                              }
                                  
                            
                    }
                                render()
                                  {
                                    if(this.props.loginStatus)
                                    {
                                     
                                      return <Redirect to ="/adminwelcome"/>
                                    }
                                 
                                 
                                 
                                    const{mess}=this.state;
                                 return(
                                 
                                 
                                  <Form>
                              
                                   <Row>
                                       <Col>
                                   <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"  name="email" placeholder="Enter email" onChange={this.handleChange}   />
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"  name="password" placeholder="Enter password" onChange={this.handleChange}   />
                                    </Col>
                                    </Row>
                                     <Row>
                                     <Col>
                                     <Button variant="primary" onClick={()=>this.handleSubmit()}>AdminLogin</Button>
                                     </Col> 
                                      </Row>
                                         {this.state.passwordError} {this.state.emailError}<br></br>
                                     
                                        {mess}
                              </Form>
                            
                                  )
                                  }
}


function mapStateToProps(state) {
  

  const { islogin,maintoken } = state
  
  return { loginStatus: islogin, tokenizer: maintoken }
  }
  
export default connect(mapStateToProps)(AdminLogin);