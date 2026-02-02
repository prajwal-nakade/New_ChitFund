import { createContext, useEffect, useState } from "react";
import { getAllChitDetails, getBranches, getUserEntries } from "../api/endpoint";

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

    const [branchData, setBranchData] = useState([])
    const [allchitData, setAllChitData] = useState([])

    const fetchBranchData = async()=>{
        const data = await getBranches()
        console.log(data)
        setBranchData(data)
    }
    const fetchChitsData = async()=>{
        const data = await getAllChitDetails()
        console.log(data)
        setAllChitData(data)
    }

    useEffect(()=>{
        fetchBranchData()
        fetchChitsData()
    }, [])

    
    const value = {
        userData, branchData, fetchBranchData, fetchChitsData, allchitData, fetchUserEntriesData
    }

    return(
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}