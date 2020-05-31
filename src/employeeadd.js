import React from 'react';
import { withRouter } from 'react-router';
import {Redirect} from 'react-router-dom'
import { Form,Button,Row,Col} from 'react-bootstrap';
import {connect} from 'react-redux';

class EmployeeAdd extends React.Component 
{
    constructor(props)
  {
      super(props);
    
      this.state = {
          name:'',
          email:'',
          password:'',
          qci_id:'',
          board:'',
          designation:'',
          type_of_employee:'',
          gender:'',
          bal_cl:0,
          bal_sl:0,
          bal_pl:0,
          bal_ml:0,
          bal_eol:0,
          nameError:'',
          passwordError:'',
          emailError:'',
          qci_idError:'',
          mess:'',
          succ:'',
          emp:[]
         
          
            
        };
   
    }
      

     
    
     valid()
    {
   
      if(!(isNaN(this.state.name)))
      {
   
       this.setState({nameError:"Invalid name"})
      }
      else if((isNaN(this.state.qci_id)))
      {
       
       this.setState({qci_idError:"qci_id should be number"})
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


 
componentWillMount()
{   
    let yrl="";
 
  
    if((this.props.match.url)===('/employeeadd/'))
    {
      
     yrl="http://127.0.0.1:5000/lms/addEmployee";
    }
    else
    {
    
     yrl ="http://127.0.0.1:5000/lms/editEmployeeDetails";
      var a=this.props.location.pathname;
      a=a.split("/");
      
     var obj=(this.props.dataemploy).filter(
      employee=>employee.qci_id===a[2]
    ) 
    console.log(obj[0]);
    this.setState(obj[0]);
   }
   
    
 
}
    

     handleChange = event => {
                                  this.setState({ [event.target.name]:event.target.value })
                             }
     handleSubmit()
              {
                let yrl="";
            
                             
                  let op="";
                   if((this.props.match.url)===('/employeeadd/'))
                   {
                     op="add"
                    yrl="http://127.0.0.1:5000/lms/addEmployee";
                   }
                   else
                   {
                     op="edit"
                    yrl ="http://127.0.0.1:5000/lms/editEmployeeDetails";
                   }

               
              

                                 const data = { 
                                     name:this.state.name,
                                      email:this.state.email,
                                      password:this.state.password,
                                      qci_id:this.state.qci_id,
                                      board:this.state.board,
                                      designation:this.state.designation,
                                      type_of_employee:this.state.type_of_employee,
                                      gender:this.state.gender,
                                      bal_cl:this.state.bal_cl,
                                      bal_sl:this.state.bal_sl,
                                      bal_pl:this.state.bal_pl,
                                      bal_ml:this.state.bal_ml,
                                      bal_eol:this.state.bal_eol
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
                                    
                                     if(response.success)
                                     {
                                       if(op==="add")
                                       {
                                       this.props.dispatch({type:'Employee_add',
                                                           payload:data})
                                       }
                                       else
                                       {
                                        this.props.dispatch({type:'Employee_edit',
                                        payload:data})
                                       }
                                       
                                     }
                                   this.setState({succ:(response.success).toString()})                    
                                   this.setState({mess:response.message})
                                     
                                 }); 
  
                             }
            }
                                render()
                                  {
                                     //console.log(this.state.obj); 
                                    console.log(this.state);
                                 const{mess}=this.state;
                                
                              if(this.state.succ)
                              {                           
                                return <Redirect to='/adminwelcome'/>
                              }
                        
                                 return(
                                  <Form>
                                    <h3>Employee Details</h3>
                                  <Row>
                                    <Col>
                                    <Form.Label>Name</Form.Label>
                                      <Form.Control name="name" size="sm" placeholder="Enter name" value={this.state.name} onChange={this.handleChange} />
                                    </Col>
                                    <Col>
                                    <Form.Label>Qci_id</Form.Label>
                                      <Form.Control type="number"  size="sm"  name="qci_id"  placeholder="Enter qci_id" value={this.state.qci_id} onChange={this.handleChange} />
                                    </Col>
                                
                                  </Row>
                                  <br></br>
                                  <Row>
                                  <Col>
                                    <Form.Label>Email</Form.Label>
                                      <Form.Control type="text" size="sm"  name="email" placeholder="Enter email" value={this.state.email}  onChange={this.handleChange} />
                                    </Col>
                                    <Col>
                                    <Form.Label>Password</Form.Label>
                                      <Form.Control type="password" size="sm" name="password"  placeholder="Enter password" value={this.state.password}  onChange={this.handleChange} />
                                    </Col>
                                  </Row>
                                  <br></br>
                                  <Row>
                                  <Col>
                                    <Form.Label>Board</Form.Label>
                                      <Form.Control type="text" size="sm" name="board"  placeholder="Enter board" value={this.state.board} onChange={this.handleChange} />
                                    </Col>
                                    <Col>
                                    <Form.Label>Designation</Form.Label>
                                      <Form.Control type="text" size="sm" name="designation"  placeholder="Enter designation" value={this.state.designation}  onChange={this.handleChange} />
                                    </Col>
                                  </Row>
                                      <br></br>
                                  <Row>
                                  <Col>
                                    <Form.Label>Type_of_employee</Form.Label>
                                      <Form.Control type="text" size="sm" name="type_of_employee"  placeholder="Enter type_of_employee" value={this.state.type_of_employee} onChange={this.handleChange} />
                                    </Col>
                                    <Col>
                                    <Form.Label>Gender</Form.Label>
                                      <Form.Control type="text" size="sm" name="gender"  placeholder="Enter gender" value={this.state.gender} onChange={this.handleChange} />
                                    </Col>
                                  </Row>
                                  <br></br>
                                  <Row>
                                  <Col>
                                    <Form.Label>Bal_cl</Form.Label>
                                      <Form.Control type="number"  name="bal_cl" size="sm" value={this.state.bal_cl} placeholder="Enter bal_cl"   onChange={this.handleChange} />
                                    </Col>
                                  <Col>
                                    <Form.Label>Bal_ml</Form.Label>
                                      <Form.Control type="number"  name="bal_ml" size="sm" value={this.state.bal_ml} placeholder="Enter bal_ml"  onChange={this.handleChange} />
                                    </Col>
                                    </Row>
                                    <br></br>
                                    <Row>
                                  <Col>
                                    <Form.Label>Bal_eol</Form.Label>
                                      <Form.Control type="number"  name="bal_eol" size="sm" value={this.state.bal_eol}  placeholder="Enter bal_eol"   onChange={this.handleChange} />
                                    </Col>
                                     
                                  <Col>
                                    <Form.Label>Bal_pl</Form.Label>
                                      <Form.Control type="number"  name="bal_pl" size="sm" value={this.state.bal_pl} placeholder="Enter bal_pl"  onChange={this.handleChange} />
                                    </Col>
                                    </Row>
                                    <br></br>
                                    <Row>
                                     
                                  <Col >
                                    <Form.Label>Bal_sl</Form.Label>
                                      <Form.Control type="number" name="bal_sl" size="sm" placeholder="Enter bal_sl" value={this.state.bal_sl}  onChange={this.handleChange} />
                                    </Col>
                                    <Col>
                                  
                                    
                                    </Col>
                                    </Row>       
  
                                    <Button  onClick={()=> this.handleSubmit()} variant="primary">Submit</Button>
                                    
                                    <br></br>
                                   {this.state.qci_idError} {this.state.nameError} {this.state.passwordError} {this.state.emailError}<br></br>
                                    {mess}
                      
  </Form> 
  )
 }
}
function mapStatetoProps(state)
     {
       const{employ}=state;
         console.log(employ);
        return {dataemploy:employ} ;
        }
        
        export default withRouter(connect(mapStatetoProps)(EmployeeAdd));
 
    

