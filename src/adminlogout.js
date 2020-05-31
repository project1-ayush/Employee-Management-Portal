import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
class AdminLogout extends Component 
{
    render() 
    {
        this.props.dispatch({type:'AdminLogin_failure'})
        return (
            <div>
                <h1>
                    You have been logged out!
                </h1>
                <Link to="/adminlogin">Admin Login Again</Link> 
            </div>
        )
    }
}


function mapStateToProps(state) {
     const { islogin,maintoken } = state
     return { loginStatus: islogin, tokenizer: maintoken }
     } 
   export default connect(mapStateToProps)(AdminLogout);