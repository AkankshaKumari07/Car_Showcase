'use client'
import React from 'react';
import {customButtonProps} from '@/app/types';
import Image from 'next/image';



const CustomButton = ({title, containerStyles, handleClick, btnType, textStyles, rightIcon }:customButtonProps) => {
  return (
   <button className={`flex flex-row relative justify-center items-center py-3 px-6 outline-none ${containerStyles}`}
   disabled={false} 
   type={btnType ||'button'}
   onClick={()=>{}}
  
   > 
    <span className={`flex-1 ${textStyles}`}>{title}
    </span>
    {rightIcon && (
      <div className='relative w-6 h-6'>
        <Image src={rightIcon} alt='right icon' 
        fill
        className='object-contain'
         />
      </div>
    )}
   </button>
  )
}

export default CustomButton
