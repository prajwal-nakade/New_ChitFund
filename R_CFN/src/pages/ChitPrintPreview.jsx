import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { useParams } from 'react-router'
import { getChitbyID } from '../api/endpoint'
import { ShipWheel } from 'lucide-react'

const ChitPrintPreview = () => {
    const { id } = useParams()
    const [chitDetails, setChitDetails] = useState(null)

    useEffect(()=>{
        const fetchChitDetail = async()=>{
            const data = await getChitbyID(id)
            setChitDetails(data)
            console.log(data)
        }

        fetchChitDetail()
    }, [id])

     if (!chitDetails) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto">
          <div className='min-h-screen flex items-center justify-center'>
            <div className='flex items-center gap-2 text-neutral-500'>
                <ShipWheel size={18} className='animate-spin'/> <span>Loading chit details...</span>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
    const user = chitDetails.user
    const nominee = user.nominees?.[0]
  return (
    <Layout>
        
        
    </Layout>
  )
}

export default ChitPrintPreview