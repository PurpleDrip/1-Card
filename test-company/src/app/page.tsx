"use client"

import { getSignature } from '@/api/extension'

const page = () => {
  const handleClick=async ()=>{
    console.log("Clicked")
    const res=await getSignature();
    console.log(res)
  }
  return (
    <div className='h-screen p-8'>
      <section className='w-full bg-red-400 px-4 py-2 rounded-3xl flex items-center justify-between'>
        <h1 className='text-3xl'>Company XYZ</h1>
        <button className='bg-red-900 px-3 py-1 rounded-full cursor-pointer'
          onClick={handleClick}>Use Null Card</button>
      </section>
    </div>
  )
}

export default page