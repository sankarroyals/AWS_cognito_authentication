import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../ContextApi/Account'
import './navbar.css'
import {Link, useLocation, useParams}  from 'react-router-dom'

const Status = () => {

    const {status, logout} = useContext(AccountContext)
    const {pathname} = useLocation()

    
  return (
    <div className='navBarContainer'>
        <div className='navbarInner'>
             {status ? <span onClick={logout} style={{cursor: 'pointer'}}>Logout</span> : <>
             <div><Link to='/login' style={{cursor: 'pointer', textDecoration: 'none', borderBottom: pathname=='/login'?'3px solid green':'' , color: 'white'}}>Login</Link></div>  
             <div><Link to='/signup' style={{cursor: 'pointer', textDecoration: 'none', borderBottom: pathname=='/signup'?'3px solid green':'', color: 'white'}}>Sign up</Link></div>
             </> 
             }
        </div>
    </div>
  )
}

export default Status