import Header from '@/components/Header'
import Hero from '@/components/Hero'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen bg-gray-900 p-4'>
        <Header/>
        <Hero/>
    </div>
  )
}

export default page