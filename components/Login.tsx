import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { SignInButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import AuthGate from './auth/AuthGate';

interface Props {
    content?: string;
}

const Login = ({
    content = 'Please login or feel free to create an account if you don\'t have one.' 
}: Props) => {
    return (
        <AuthGate>
            <div className='flex items-center md:min-h-150 lg:min-h-190 justify-center py-12 md:py-30 bg-gray-100 p-4'>
                <Card className='w-full max-w-md'>
                    <CardHeader className='flex flex-col items-center gap-1'>
                        <CardTitle className='text-2xl font-bold text-center'>Login</CardTitle>
                    </CardHeader>

                    <CardContent className='space-y-4'>
                        <p className='text-center font-medium text-gray-700'>{content}</p>

                        <SignInButton mode='modal'>
                            <Button className='w-full' size='lg'>Log In</Button>
                        </SignInButton>
                    </CardContent>

                    <CardFooter className='flex flex-col space-y-2'>
                        <div className='text-sm text-muted-foreground text-center'>Don't have an account?</div>

                        <SignInButton mode='modal'>
                            <Button className='w-full' variant='outline' size='lg'>Create an account</Button>
                        </SignInButton>
                    </CardFooter>
                </Card>
            </div>
        </AuthGate>
  )
}

export default Login;