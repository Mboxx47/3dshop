'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { MdKeyboardDoubleArrowDown } from 'react-icons/md'
import TypingText from '../TypingText'


const Hero = () => {
  useEffect(() => {
    // const handleScroll = () => {
    //   const heroElement = document.getElementById('hero');
    //   if(heroElement){
    //     const rect = heroElement.getBoundingClientRect();
    //     const isInView = rect.top >= 84 && rect.bottom >= window.innerHeight;
    //     document.body.style.overflow = isInView ? 'hidden' : "auto"
    //   }
    // }

    // window.addEventListener('scroll', handleScroll);

    // //handleScroll();

    // return () => {
    //   //window.removeEventListener('scroll', handleScroll);
    //   document.body.style.overflow = "auto"
    // }
  }, [])

  return (
    <div id='hero' className='relative h-screen max-w-[1024px] container mx-auto flex flex-col p-4 pt-8 lg:pt-32 md:p-16'>
      <div className='flex flex-col md:flex-row items-center relative'>
        <div className='w-full h-full md:w-1/2 flex flex-col gap-8 z-10 bg-gradient-to-r from-stone-950 via-stone-950 to-transparent'>
          <div>
            
            <TypingText text="Your keyboard" textStyles="text-5xl md:text-6xl font-bold"/>
            <TypingText text="your comfort!" textStyles="text-5xl md:text-6xl font-bold"/>
          </div>
          <p className='text-slate-400 font-semibold'>Discover a keyboard designed for both style and functionality, providing unmatched comfort and efficiency for your everyday tasks.</p>
          <div className='flex flex-row gap-6'>
            <Link href='#catalog' className='w-36 flex justify-center py-3 rounded-xl text-xs bg-gradient'>Buy keyboard</Link>
            <Link href='#fatures' className='w-36 flex justify-center py-3 rounded-xl text-xs  border-[1px] border-white'>See more</Link>
          </div>
        </div>
        <Image src='/assets/hero.png' alt='hero image' width={700} height={400} unoptimized={true} priority className='md:absolute left-1/4 top-4 mt-16 md:mt-0' />
      </div>

      <Link href='#catalog' className='absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-row items-top px-6 py-2 mx-auto mb-16 mt-auto border-[1px] border-slate-400 rounded-xl text-sm text-slate-400'>
        <MdKeyboardDoubleArrowDown className='w-4 h-4 mr-2 animate-ping' />
        <span>click to scroll</span>
        <MdKeyboardDoubleArrowDown className='w-4 h-4 ml-2 animate-ping' />
      </Link>
    </div>
  )
}

export default Hero