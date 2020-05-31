
import React from 'react';
import { withRouter} from 'react-router';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {
  Link
} from "react-router-dom";
class ApplyLeave extends React.Component 
{
    constructor(props)
     {
      super(props);
      this.state = {
        qci_id:'',
        qci_idError:'',
        date_of_apply:'',
        leave_type:'',
        date_from:'',
        date_to:'',
        days:'',
        leave_reason:'',
        leave_status:'',       
         mess:'',
         succ:''
          
        };
     }
     valid()
     {
      
       if((isNaN(this.state.qci_id)))
       {     
        this.setState({qci_idError:"qci_id should be number"})
       }
      else
      {
         return true;    
      }
   }

    datevalid(date)
    {
         console.log(date);
         var a=date.split("-");
         
      
        console.log(a)
       
           var y=a[0];
          a[0]=a[2];
           a[2]=y;
       var b=a.join("/");
       console.log(b);
         return b;
    }


    
  

     handleChange = event => {
                                  this.setState({ [event.target.name]:event.target.value })
                             }
     handleSubmit = event =>
               {
                              
                                 const url ="http://127.0.0.1:5000/lms/applyLeave"

                                
                                  
                                   var dateapply=this.datevalid(this.state.date_of_apply);
                                   var datefrom=this.datevalid(this.state.date_from);
                                   var dateto=this.datevalid(this.state.date_to);
                                   console.log(dateapply);
                                   
                                    const data = { 
                                        qci_id:this.state.qci_id,
                                        date_of_apply:dateapply,
                                        date_to:dateto,
                                        date_from:datefrom,
                                        days:this.state.days,
                                        leave_reason:this.state.leave_reason,
                                        leave_status:this.state.leave_status,
                                        leave_type:this.state.leave_type
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
                                    
                                     if(response.success)
                                      {
                                        console.log("hi");
                                        this.props.dispatch({type:'Employee_leave',
                                                              payload:data})
                                      }
                                     this.setState({succ:(response.success).toString()})   
                                     this.setState({mess:response.message}) 
                                 }); 
                                 
                                }        
                    
                }
                                render()
                                  {
                                
                         
                                   if(this.state.succ)
                                {
                            
                                   return <Redirect to='/employeelogin'/>
                                 }
                          
                              console.log("hello");
                                 const { 
                                  qci_id,
                                  date_of_apply,
                                  date_to,
                                  date_from,
                                  days,
                                  leave_reason,
                                  leave_status,
                                  leave_type
                                  }=this.state;

                                 return(
                                   
                                  <div className="container">
                                    <h1>For Appling Leave.</h1>
                                  <Row>
                                               
                                                  <Col>
                                                  <Form.Label>Qci_id</Form.Label>
                                                    <Form.Control type="number"  size="sm"  name="qci_id"  placeholder="Enter qci_id" value={qci_id} onChange={this.handleChange} />
                                                  </Col>
                                              
                                                </Row>
                                                <br></br>
                                                <Row>
                                                <Col>
                                                  <Form.Label>Date_of_apply</Form.Label>
                                                    <Form.Control type="date" size="sm"  name="date_of_apply" placeholder="Enter Date_of_apply" value={date_of_apply}  onChange={this.handleChange} />
                                                  </Col>
                                                  <Col>
                                                  <Form.Label>Date_from</Form.Label>
                                                    <Form.Control type="date" size="sm" name="date_from"  placeholder="Enter date_from" value={date_from}  onChange={this.handleChange} />
                                                  </Col>
                                                </Row>
                                                <br></br>
                                                <Row>
                                                <Col>
                                                  <Form.Label>Date_to</Form.Label>
                                                    <Form.Control type="date" size="sm" name="date_to"  placeholder="Enter date_to" value={date_to} onChange={this.handleChange} />
                                                  </Col>
                                                  <Col>
                                                  <Form.Label>Days</Form.Label>
                                                    <Form.Control type="number" size="sm" name="days"  placeholder="Enter days" value={days}  onChange={this.handleChange} />
                                                  </Col>
                                                </Row>
                                                    <br></br>
                                                <Row>
                                                <Col>
                                                  <Form.Label>Leave_reason</Form.Label>
                                                    <Form.Control type="text" size="sm" name="leave_reason"  placeholder="Enter leave_reason" value={leave_reason} onChange={this.handleChange} />
                                                  </Col>
                                                  <Col>
                                                  <Form.Label>Leave_status</Form.Label>
                                                    <Form.Control type="text" size="sm" name="leave_status"  placeholder="Enter leave_status" value={leave_status} onChange={this.handleChange} />
                                                  </Col>
                                                </Row>
                                                <br></br>
                                                <Row>
                                                <Col>
                                                  <Form.Label>Leave_type</Form.Label>
                                                    <Form.Control type="text"  name="leave_type" size="sm" value={leave_type} placeholder="Enter leave_type"   onChange={this.handleChange} />
                                                  </Col>
                                                 
                                               
                                                  </Row> 
                                   
                                                 <Button  onClick={()=> this.handleSubmit()} variant="primary">Apply Leave</Button><br></br>
                                                 {this.state.qci_idError}<br></br>
                                                      {this.state.mess}  
                                              <ul>
                                                   <li>
                                                      <Link to="/employeelogout">Employee Logout</Link>
                                                   </li>
                                  

                                              </ul>
                                                
                                  </div> 
                                  
                                  
                              
                                  
                                  )
                                  }
}

function mapStatetoProps(state)
     {
        const {employleave}=state;
        return {leavedata:employleave};
        }
        
        export default withRouter(connect(mapStatetoProps)(ApplyLeave));
 