"use client"

import TitleBar from '@/components/home/TitleBar'
import ProgressModal from '@/components/modals/ProgressModal'
import React, { useState } from 'react'

const page = () => {
  interface stageType  {
    title: string;
    message: string;
    approxTime: number;
  }

  const [showModal, setShowModal] = useState(false)
  const [stages, setStages] = useState<stageType[]>([]);
  const [stageNumber, setStageNumber] = useState(0)

  const increementStageNumber=()=>{
    if(stageNumber===stages.length-1) return;
    setStageNumber((prev)=>prev+1);
  }


  return (
    <div className="min-h-screen w-full p-4 bg-black">
      <TitleBar setShowModal={setShowModal} setStages={setStages} increementStageNumber={increementStageNumber} setStageNumber={setStageNumber} />
      <ProgressModal stages={stages} showModal={showModal} setShowModal={setShowModal} currentStage={stageNumber}/>
    </div>
  )
}

export default page