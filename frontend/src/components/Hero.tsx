import React from 'react'
import DocsSection from './DocsSection'
import Extension from './Extension'
import AvailableDocs from './AvailableDocs'

const Hero = () => {
  return (
    // <div classNameName='h-4/5 border m-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
    //     <DocsSection/>
    //     <AvailableDocs/>
    //     <Extension/>
    //     <DocsSection/>
    // </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
  <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 bg-white rounded-2xl shadow p-6">
    <h2 className="text-xl font-semibold mb-2">User Info</h2>
    <p>Wallet Address, ocId, account status, etc.</p>
  </div>

  <div className="bg-white rounded-2xl shadow p-6">
    <h2 className="text-lg font-semibold mb-2">Documents</h2>
    <p>Aadhar, Passport, Voter, etc.</p>
  </div>


  <div className="bg-white rounded-2xl shadow p-6">
    <h2 className="text-lg font-semibold mb-2">MSRIT Docs</h2>
    <p>USN, Department, Year of Admission</p>
  </div>


  <div className="row-span-2 bg-white rounded-2xl shadow p-6">
    <h2 className="text-lg font-semibold mb-2">Verification Status</h2>
    <p>Real-time verified status of all documents</p>
  </div>


  <div className="bg-white rounded-2xl shadow p-6">
    <h2 className="text-lg font-semibold mb-2">Upload to IPFS</h2>
    <p>Upload and store files</p>
  </div>
</div>

  )
}

export default Hero