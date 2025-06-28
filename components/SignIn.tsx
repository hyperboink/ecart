import React from 'react';
import { SignInButton } from '@clerk/nextjs';

const SignIn = () => {
  return (
    <SignInButton mode="modal">
        <button className='text-sm font-semibold hover:text-primary-dark hover-transition hover:cursor-pointer'>Login</button>
    </SignInButton>
  )
}

export default SignIn;