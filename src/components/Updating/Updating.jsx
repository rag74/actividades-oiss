import React from 'react'
import './Updating.css';
import ClockLoader from "react-spinners/ClockLoader";

function Updating() {
  return (
    <>
        <div className='seperator gradient'></div>
        <div className='updtOverlay'>
            
            <ClockLoader color="#676767" speedMultiplier={2} />
        </div>
    </>  
  )
}

export default Updating