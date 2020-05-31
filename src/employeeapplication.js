import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import { BrowserRouter as Router, Link ,Route,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
class EmployeeApplication extends Component
{
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        employees: [],
        disabled:false,
        mess:"",   
      }
    } 
   approveLeave(qciid)
   {
     var apiUrl='http://127.0.0.1:5000/lms/approveLeave';
     var emp=(this.props.data).filter(empdata=>empdata.qci_id===qciid)
    
     
     fetch(apiUrl,
      {
           method: 'POST',                                             
                 headers:{ 
                    'Content-Type': 'application/json',
                      'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOjEyMzR9.AkulsG22blITRUe4-iROKG25EIqT8H2-5HXLT93nQXc' 
                      },
                  
                    body: JSON.stringify({
                      "application_id":emp[0].application_id,
                      "qci_id":emp[0].qci_id,
                      "date_reviewed":"12/12/2020"
                    })
                   
       })
      .then(res => res.json())
     .then(
       (response) => {
       if(response.success)
        {
          this.props.dispatch({type:'Employee_approve',
          payload:response.message}) 
       
                                      
       }  
   
     
      }
      
     )
    }
    declineLeave(qciid)
   {
     var apiUrl='http://127.0.0.1:5000/lms/declineLeave';
     var emp=(this.props.data).filter(empdata=>empdata.qci_id===qciid)
    
     
     fetch(apiUrl,
      {
           method: 'POST',                                             
                 headers:{ 
                    'Content-Type': 'application/json',
                      'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOjEyMzR9.AkulsG22blITRUe4-iROKG25EIqT8H2-5HXLT93nQXc' 
                      },
                  
                    body: JSON.stringify({
                      "application_id":emp[0].application_id,
                       "decline_reason":"Not A Good Reason To Take Leave",
                      "date_reviewed":"12/12/2020"
                    })
                   
       })
      .then(res => res.json())
     .then(
       (response) => {
       if(response.success)
        {
         
          this.props.dispatch({type:'Employee_decline',
          payload:response.message}) 
       
                                      
       }  
   
     
      }
      
     )
    }                            

   
    handleInfo=()=>{
        var yr=[];
        var year=[];
        var date=[];
        var month=[];
        var fil=(this.props.data).map(value=>value.date_of_apply);
 
          for(var i=0;i<fil.length;i++)
              {
                     date[i]=fil[i].split("/")[0];        
                    month[i]=fil[i].split("/")[1];
                    yr[i]=fil[i].split("/")[2];
                     year[i]=fil[i].split("/")[2];
             }
      
            yr.sort();


       let l=0,j=0,k=0;
       var newdate=[];
       var n=yr.length;
       while(l<n)
       {      
             while(yr[l]!==year[j])
            {       
               j++;
             }     
            newdate[l]=(date[j]+"/"+month[j]+"/"+year[j]);   
            j=0;
            l++;   
       }
          console.log(newdate);
          l=newdate.length;
          console.log(l);
              
              
              
    } 
         componentDidMount()
              {
                let apiUrl="";       
                if(!(this.props.countdata))
                {
                  apiUrl = 'http://127.0.0.1:5000/lms/application';
                 
                
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
                                          this.handleInfo();                                    
                                          this.props.dispatch({type:'Employee_application',
                                          payload:response.data})
                                      }                              
                                    }                                   
                                  )
                                  }              
                 }
     
    render() 
    {
      console.log(this.props.isdisable);
      console.log(this.props.mess);
      
      var empdata=this.props.data;
     
        
 
       if(empdata.length>0)
       { 
        return(     
          <div>    
          
    
      
     
    
                   
          {(this.props.data).map((employee,index) => (                            
           <ul key={index}>   
             {
                    this.props.data[index].info.map((emp,i)=>(
                     <li key={i}>
                 
                        <li><h5>Employee Name :</h5> {emp.name}</li>  
                         <li><h5> Employee Email :</h5> {emp.email}</li>
                      </li>
                       ))
               }                           
                                           
               <li><h5>Employee Qci_id :</h5> {employee.qci_id}</li>
               
               <li><h5>Employee Date_of_apply :</h5> {employee.date_of_apply}</li>
               <li><h5>Employee Leave_status :</h5> {employee.leave_status}</li>
               <Button disabled={this.props.isdisable} onClick={()=>this.approveLeave(employee.qci_id)}>Approve</Button>
               <Button disabled={this.props.isdisable} onClick={()=>this.declineLeave(employee.qci_id)}>Decline</Button>
               <hr></hr>
               <li>{this.props.mess}</li>
           </ul>          

          ))}
          
      </div>
      
     
      );
                          
      }
        else
      {
         return (
               <p>dfgfdng</p>
                 )
     }            
  
}
}
  
    function mapStatetoProps(state)
     {
     
        const {employleavedata,employleavedatasorted,isdisabled,message}=state;
        console.log(state);
        return {data:employleavedata,
          data1:employleavedatasorted,
          isdisable:isdisabled,
          mess:message

                };
        }
        
     export default withRouter(connect(mapStatetoProps)(EmployeeApplication));
 
  