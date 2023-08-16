import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AccountContext } from './ContextApi/Account'

const NoPage = () => {
    const {status, logout} = useContext(AccountContext)
  return (
    <div>NoPage go to {status?<Link to='/'>Home</Link>:<Link to='/login'>Login</Link>}</div>
  )
}

export default NoPage