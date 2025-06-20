import React, { createContext, useState } from 'react'

export const DataUserContext=createContext()

const UserContext = ({children}) => {

    const [user, setUser] = useState({
      fullName:{
        firstName:'',
        lastName:''
      },
      email:''
    })

  return (
    <div>
        <DataUserContext.Provider value={{user, setUser}}>
            {children}
        </DataUserContext.Provider>
    </div>
  )
}

export default UserContext;