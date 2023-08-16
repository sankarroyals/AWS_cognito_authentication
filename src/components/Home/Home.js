import React, { useContext } from 'react'
import { AccountContext } from '../ContextApi/Account'
import { Navigate } from 'react-router'
import DataTable from '../LoginedUsersTable/DataTable'

const Home = () => {
    
  const {status} = useContext(AccountContext)
  return (
    <div>
        {(status =='' ||  status==true)?<div><DataTable /></div>:
        <Navigate to={'/login'} />
        }
    </div>
  )
}

export default Home