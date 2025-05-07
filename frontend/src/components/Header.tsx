import React from 'react'

const Header = () => {
  return (
    <div className='border rounded-full flex items-center justify-between px-4 py-2'>
        <div className='text-xl'>
            1Card
        </div>
        <div className='flex gap-2'>
            <button className='py-1 px-4 rounded-full bg-red-600'>View 1Card</button>
        </div>
    </div>
  )
}

export default Header