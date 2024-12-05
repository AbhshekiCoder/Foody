import React from 'react'

export default function Signup() {
  return (
    <>
         <form name = "signup">
         <div className='max-w-96 h-16 mt-3'>
                <input type = "phone" className='w-full h-full border pl-3 outline-none' placeholder='phone number' name = "phone" required/>
            </div>
            <div className='max-w-96 h-16 mt-3'>
                <input type = "text" className='w-full h-full border pl-3 outline-none' placeholder='name' name = "name" required/>
            </div>
            <div className='max-w-96 h-16 mt-3'>
                <input type = "text" className='w-full h-full border pl-3 outline-none' placeholder='email' name = "email" required/>
            </div>
            <div className='max-w-96 h-16 mt-3'>
                <input type = "password" className='w-full h-full border pl-3 outline-none' placeholder='password' name = "password" required/>
            </div>
            <div className='max-w-96 h-10 mt-3'>
            <button className='w-full h-full bg-orange-500 text-white font-bold'>Continue</button>

            </div>
            <p className='mt-3 text-sm'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
           
         </form>
    </>
  )
}
