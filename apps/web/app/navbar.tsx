import React from 'react';
import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })


export default function Navbar() {
    return (
        <>
        {/* <style jsx>{`
          .title{
            // font-family: ${inter.style.HomemadeApple};
          }
        `}
        </style> */}
        <nav className='sticky top-0 h-10 bg-[rgb(31,31,32)]'>
          <div className='title text-white text-center text-[30px]'>Hidraw</div>  
        </nav>
        </>
      );
}
