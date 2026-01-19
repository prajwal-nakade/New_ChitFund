import { createContext, useEffect, useState } from "react";
import { getUserEntries } from "../api/endpoint";

export const UserContext = createContext()

export const UserContextProvider = (props)=>{


    const [userData, setUserData] = useState([])
    const fetchUserEntriesData = async()=>{
        const data = await getUserEntries()
        console.log(data)
        setUserData(data)
    }

    useEffect(()=>{
        fetchUserEntriesData()
    }, [])

    const value = {
        userData
    }

    return(
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}