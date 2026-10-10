import React from 'react'
import Header from '@/components/sathi/Header';
import { SignUp } from '@clerk/nextjs'
const page = () => {
  return (
    <>
        <Header/>
        <div className='flex justify-center items-center  w-full my-[2rem] ' >
            <SignUp appearance={
                {
                    variables:{
                        fontSize:"1.3rem"
                    },
                    elements:{
                        cardBox:"!w-[100%]",
                        rootBox:"!w-[35%]"
                    }
                }
            } />
        </div>
    </>
  )
}

export default page