import "./globals.css";
import PageLoadingBar from "@/components/PageLoadingBar";
import { Toaster } from 'react-hot-toast';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className='font-sans antialiased'>
                <PageLoadingBar />

                {children}
                
                <Toaster
                    position='bottom-right'
                    toastOptions={{
                        style: {
                            background: '#000',
                            color: '#fff'
                        }
                    }}/>
            </body>
        </html>
    )
}

export default RootLayout;