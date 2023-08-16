
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
const AccountContext = createContext()

const Account = (props) => {

    const BaseApi = 'http://localhost:3001'
    
    const navigate = useNavigate();

    const [status, setStatus] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem('loginStatus')){
          setStatus(true)
        }
        else{
          setStatus(false)
        }
    }, [])

   const logout = () =>{
    const user = localStorage.getItem('loginStatus')
    if(user){
        localStorage.removeItem('loginStatus')
        navigate('/login')
        setStatus(false)
    }
   }
    return(
        <AccountContext.Provider value={{logout, status, setStatus, BaseApi}}>
            {props.children}
        </AccountContext.Provider>
    )
 
}

export {Account, AccountContext}