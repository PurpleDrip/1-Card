"use client"

import { useState } from "react";
import LoginModal from "../modals/LoginModal"
import RegisterModal from "../modals/RegisterModal";

interface TitleBarProps {
  setShowModal: (show: boolean) => void;
  setStages: (stages: any) => void;
  increementStageNumber: () => void;
  setStageNumber:(stage:number)=>void
}

const TitleBar = ({ setShowModal, setStages, increementStageNumber,setStageNumber }: TitleBarProps) => {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
        <section className='md:h-[4rem] h-[2.5rem] rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-between md:px-2 px-1'>
            <div className='flex gap-2 items-center'>
            <img src="/null.png" alt="Company Logo" className='md:h-[3rem] h-[2rem]'/>
            <h1 className='text-lg md:text-3xl text-white'>Null Card Inc</h1>
            </div>

            <div className='flex gap-2 items-center md:mr-2'>
            <button className="md:px-8 px-2.5 md:py-2 py-0.5 bg-emerald-900 border border-emerald-600 rounded-full text-white md:text-md text-sm hover:cursor-pointer" onClick={()=>setShowLogin(true)}>Login</button>
            <button className="md:px-8 px-2.5 md:py-2 py-0.5 bg-emerald-900 border border-emerald-600 rounded-full text-white md:text-md text-sm hover:cursor-pointer" onClick={()=>setShowRegister(true)}>Register</button>
            </div>
        </section>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false) } setShowModal={setShowModal} setStages={setStages} increementStageNumber={increementStageNumber} setStageNumber={setStageNumber}/>
    </>
  )
}

export default TitleBar