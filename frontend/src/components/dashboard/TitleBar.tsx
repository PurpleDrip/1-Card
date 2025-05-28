"use client"

const TitleBar = () => {
  const viewNullCard=()=>{
    console.log("View Null Card clicked");
    if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ action: "open_extension_popup" });
    } else {
      console.error("Chrome extension API not available.");
    }
  }
  return (
    <>
        <section className='md:h-[4rem] h-[2.5rem] rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-between md:px-2 px-1 mt-4'>
            <div className='flex gap-2 items-center'>
            <img src="/null.png" alt="Company Logo" className='md:h-[3rem] h-[2rem]'/>

            <h1 className='text-lg md:text-3xl text-white'>Null Card 
              <span className='text-emerald-400 pl-2'>Dashboard</span>
            </h1>
            </div>

            <div className='flex gap-2 items-center md:mr-2'> 
              <button className="md:px-8 px-2.5 md:py-2 py-0.5 bg-emerald-900 border border-emerald-600 rounded-full text-white md:text-md text-sm hover:cursor-pointer" onClick={viewNullCard}>View Null Card</button>       
            </div>
        </section>
    </>
  )
}

export default TitleBar