import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import DevTools from './doc';
import { createStore, compose } from 'redux';
import AdminIndex from './Adminindex';

 const INITIAL_DATA = {
   islogin:false,
   isloginemp:false,
   count:false,
   maintoken:" ", 
   employ:[ ],
    employleavedata:[],
    employleavedatasorted:[],
    isdisabled:false,
    message:" "
   
  
   }

const enhancer = compose(
     DevTools.instrument()
        );
  
   const store = createStore(
     reducer,
     enhancer
   );

     function reducer(state = INITIAL_DATA, action)
      {
     if (typeof state === 'undefined') 
     {
     state = 0 
     return state;
    }
    else if (action.type === 'AdminLogin_success')
    {
    state["islogin"]=true;
    state["maintoken"]=action.payload;
    var new_state={...state};
    return new_state;
    }
    else if(action.type === 'AdminLogin_failure')
    {
    state["islogin"]=false;
    state["maintoken"]=" ";
    new_state={...state};
    return new_state;
    }
    else if (action.type === 'EmployeeLogin_success')
    {
    console.log(state);
    state["isloginemp"]=true;
    state["maintoken"]=action.payload;
    new_state={...state};
   console.log(new_state);
    return new_state;
    }
    else if (action.type === 'EmployeeLogin_failure')
    {
    console.log(state);
    state["isloginemp"]=false;
    state["maintoken"]=" ";
    new_state={...state};
   console.log(new_state);
    return new_state;
   }
   else if(action.type === 'Employee_data')
    {
    state['employ']=action.payload;
    new_state={...state}; 
    return new_state;
    }
    else if(action.type==='Employee_delete')
    {
    var emp= [...(state.employ).filter(employee => employee.qci_id !== action.payload)]
    state['employ']=emp;
     return {...state}
    }
    else if(action.type==='Employee_add')
    {  
    emp=action.payload;
    state['employ']=(state.employ).concat(emp);
    state['count']=true;
     return {...state}
    }
    else if(action.type==='Employee_edit')
    { 
    emp=action.payload;
    var newemp= [...(state.employ).filter(employee => employee.qci_id !== emp.qci_id)]
    state['employ']=(newemp).concat(emp);
    state['count']=true;
   return {...state}
    }
    else if(action.type==='Employee_leave')
    { 
    state['employleave']=action.payload;
    new_state={...state};   
    return new_state;
    }
    else if(action.type === 'Employee_application')
    {
    state['employleavedata']=action.payload;
    new_state={...state}; 
    return new_state;
    }
    else if(action.type === 'Employee_approve')
    {
    console.log(state);
    state['isdisabled']=true;
    state['message']=action.payload;
    new_state={...state};
    console.log(new_state); 
    return new_state;
    }
    else if(action.type === 'Employee_decline')
    {
    state['isdisabled']=true;
    state['message']=action.payload;
    new_state={...state}; 
    return new_state;
    }
    else if(action.type === 'Employee_applicationsorted')
    {
    console.log(action.payload);
    state['employleavedatasorted']=action.payload;
    new_state={...state}; 
    console.log(new_state);
    return new_state;
    }
    else
    {
        return state;
    }
    } 
  const jsx =<Provider store={store}>
    <AdminIndex/>
    <DevTools/>
    </Provider>
    
   ReactDOM.render(jsx, document.getElementById('root'));
