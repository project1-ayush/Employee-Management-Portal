
import React from 'react';
import { BrowserRouter as Router, Link ,Route,Redirect } from 'react-router-dom';
import { Form,Button,Row,Col} from 'react-bootstrap';
class AdminSignup extends React.Component 
{
    constructor(props)
     {
      super(props);
      this.state = {
          name:'',
          email:'',
          password:'',
          nameError:'',
          passwordError:'',
          emailError:'',
          mess:'',
          succ:''   
        };
     }
     valid()
  
    {
        if(!(isNaN(this.state.name)))
      {
       this.setState({nameError:"Invalid name"})
      }
      
      else if(!(this.state.email.includes("@")))
      {
      this.setState({emailError:"Invalid email"})
      }
      else if((this.state.password.length<5))
      {
       this.setState({passwordError:"Password length should be greater than 5"})
      }
      else if(!this.state.email.includes("@") && this.state.password.length<5 && (!(isNaN(this.state.name))))
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
                               
                                 const url ="http://127.0.0.1:5000/lms/admin"

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
                                 body: JSON.stringify(data), // data can be `string` or {object}!
                                 headers:{ 
                                     'Content-Type': 'application/json',
                                     'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOjEyMzR9.AkulsG22blITRUe4-iROKG25EIqT8H2-5HXLT93nQXc' 
                                    }
                                 })
                                 .then(res => res.json())
                                 .catch(error => console.error('Error:', error))
                                 .then(response =>{
                                     //console.log('Success:', response.success);
                                     this.setState({mess:response.message})
                                     this.setState({succ:((response.success).toString())})
                                      
                                 }); 
                                 
                                  
                    }
                }
                                render()
                                  {
                                    if(this.state.succ==='true')
                                    {
                                      
                                       return <Redirect to="/adminlogin"/>
                                    }
                               
                                      
                                 const{mess}=this.state;
                                 return(
                                  
                                 
 <Form>
     <Row>
      <Col>
      <Form.Label>Name</Form.Label>
      <Form.Control name="name" class="col-sm-6" placeholder="Enter name" onChange={this.handleChange}   />
     </Col>
      </Row>
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
        <Button variant="primary" onClick={()=>this.handleSubmit()}>AdminSignup</Button>
        </Col> 
         </Row>
            {this.state.nameError} {this.state.passwordError} {this.state.emailError}<br></br>
             {mess}

 </Form>
                                  )
                                  }
}
export default AdminSignup;
