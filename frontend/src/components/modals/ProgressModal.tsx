import { AlertCircle, ChevronsRight, Loader2, LoaderCircle } from 'lucide-react'
import React from 'react'

interface Stage {
    title: string;
    message: string;
    approxTime: number;
}



const ProgressModal = ({stages, currentStage, showModal, setShowModal}:{
  stages:Stage[],
  currentStage:number,
  showModal:boolean,
  setShowModal:(show:boolean)=>void
}) => {

  return (
    showModal ? (
      <div className='absolute top-28 left-8 text-white border p-4 max-w-[20rem] z-[100] bg-emerald-500/50 rounded-3xl border-emerald-500'>
        
        <div className='flex items-center gap-2 mb-2 text-emerald-400'>
            <div className='animate-spin'><LoaderCircle size={18}/></div>
            <h1 className='text-xl font-semibold'>Registering...</h1>
        </div>
        
        <div className='bg-red-700/50 px-4 py-2 border rounded-xl font-semibold border-red-500/30 text-red-500 flex items-center text-sm gap-2 justify-center'>
            <AlertCircle size={16}/>Please do not refresh this page.
        </div>

        <div className='border my-4 border-emerald-500 mx-auto'></div>

        <div className='flex mt-2 pl-4 gap-2'>
            <div className='p-1 border w-0 h-0 mt-4 bg-red-400 border-destructive animate-spin'></div>
            <div className='flex flex-col'>
                <h1 className='text-md font-semibold'>{stages[currentStage].title}</h1>
                <h2 className='text-xs text-gray-300'>{stages[currentStage].message}</h2>
                <h2 className='text-xs ml-auto mt-4 text-gray-300'>Approx Time - {stages[currentStage].approxTime} sec</h2>
            </div>
        </div>
      </div>
    ) : null
  )
}

export default ProgressModal