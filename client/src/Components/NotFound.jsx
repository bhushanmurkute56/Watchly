import React from 'react'
import lostbro from "./../assets/Lost-bro.png";

function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-red-300'>
        <h1 className='text-2xl'>Lost Your Wayyy!!!</h1>
        <img src={lostbro} alt="" className='h-120 w-120'/>
        <button className='border p-3 rounded-lg cursor-pointer hover:bg-red-400'>Back To Home</button>
    </div>
  )
}

export default NotFound;