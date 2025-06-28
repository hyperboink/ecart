import React from 'react'
import Logo from './Logo'

const Copyright = () => {
  return (
    <div className='py-6 border-t text-center text-sm text-gray-600'>
        <div>
            &copy; {new Date().getFullYear()}{" "} <Logo className='text-sm text-gray-600 font-normal'/>. All rights reserved.
        </div>
    </div>
  )
}

export default Copyright