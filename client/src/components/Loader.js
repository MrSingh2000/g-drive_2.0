import React from 'react'

export default function Loader() {
    return (
        <>
        <div className='flex flex-col items-center'>
        <div className="lds-circle">
            <div className='shadow-2xl'></div>
        </div>
        <div>
            <p className='font-bold italic'>Waiting for transaction confirmation</p>
        </div>
        </div>
        </>
    )
}
