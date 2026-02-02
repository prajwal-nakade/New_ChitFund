import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import ChitManagement from '../components/ChitManagement'
import Layout from '../components/layout'

const ApplicationViewMaster = () => {

    const {fetchChitsData, allchitData} = useContext(UserContext)
  return (
    <Layout>
        <div className='max-w-7xl mx-auto'>

        <ChitManagement data={allchitData} fetchChitsData={fetchChitsData}/>
    </div>
    </Layout>
    // 
  )
}

export default ApplicationViewMaster