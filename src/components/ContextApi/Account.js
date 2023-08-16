import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import React, { createContext, useState } from 'react'
import UserPool from '../../UserPool'
const AccountContext = createContext()

const Account = (props) => {
    const [status, setStatus] = useState(true);
    // useEffect(()=>{
    //     getSession().then(session=>{
    //         console.log(session)
    //         setStatus(true)
    //     })
    // }, [])
    const getSession = async ()=>{
        return await new Promise((resolve, reject)=>{
            const user = UserPool.getCurrentUser()
            if(user){
                user.getSession((err, session)=>{
                    if(err){
                        reject()
                        setStatus(false)
                    } else {
                        resolve()
                        setStatus(true)
                    }
                })
            } else {
                reject()
            }
        })
    }

   const authenticate = async (Username, Password) =>{
    return await new Promise((resolve, reject)=>{
        const user = new CognitoUser({
            Username,
            Pool: UserPool
          })
    
          const authDetails = new AuthenticationDetails({
            Username,
            Password
          })
    
          user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log(data)
                resolve(data)
            },
            onFailure: (err) => {
                console.error(err)
                reject(err)
            },
            newPasswordRequired: (data) => {
                console.log(data)
                
                resolve(data)
            }
          })
    })
   }

   const logout = () =>{
    const user = UserPool.getCurrentUser()
    if(user){
        user.signOut()
    }
   }
    return(
        <AccountContext.Provider value={{authenticate, getSession, logout, status}}>
            {props.children}
        </AccountContext.Provider>
    )
 
}

export {Account, AccountContext}