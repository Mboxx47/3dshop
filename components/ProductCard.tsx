"use client"

import Image from 'next/image';
import React from 'react'
import AnimatedContainer from './AnimatedContainer';
import { Vector3 } from 'three';

interface ProductCardProps{
    index: number;
    imgSrc: string;
    title: string;
    
    modelScale: Vector3;
    isActive: boolean;
    onClick: () => void;
}

const ProductCard = ({index, imgSrc, title,  isActive, onClick}:ProductCardProps) => {
  return (
    <div onClick={onClick} className={`hover:scale-105 ${isActive ? 'scale-105' :''}`}>
      <AnimatedContainer delay={index * 0.2} styles={`w-90 h-32 flex flex-row gap-4 rounded-xl transition-all duration-300 cursor-pointer ${isActive ? 'bg-gradient' : 'bg-blue-800'}`}>
        <Image src={imgSrc} alt="keyboard photo" width={128} height={128} unoptimized={true} className='rounded-xl' />
        <div className='flex flex-col justify-between px-4 py-6 text-slate-200'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <div className='flex flex-row items-center justify-between'>
            
            <div className='w-20 flex justify-center py-1 text-sm border-[1px] rounded-xl hover:bg-stone-200 transition duration-300 hover:text-stone-800'>Read More</div>
          </div>
        </div>
      </AnimatedContainer>
      
    </div>
  )
}

export default ProductCard