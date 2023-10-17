"use client"
import Image from 'next/image'
import NextIcon from '../public/right-arrow.svg'
import PrevIcon from '../public/left-arrow.svg'
import SliderData from './data/sliderData'
import { useEffect, useState } from 'react'
import sliderData from './data/sliderData'
export default function Home() {
  const [indexSlider,setIndexSlider]=useState(1)
  const toggleImage=(index)=>{
    setIndexSlider(state=>{
      if(state+index>sliderData.length){
        return 1
      }else if(state+index<1){
        return sliderData.length
      }else{
        return state+index
      }
    })
  }
  useEffect(()=>{
    const intervalID=setInterval(()=>toggleImage(1),2000)
    return ()=>clearInterval(intervalID)
  },[])
  return (
    <main className="flex min-h-screen bg-slate-800 justify-center items-center">
      <div className='relative'>
        <span className='bg-slate-200 px-12 py-2 rounded absolute top-0 right-0 '>{SliderData.find(obj=>obj.id==indexSlider).id}/{SliderData.length}</span>
        <Image src={`/images/img-${indexSlider}.jpg`} className='w-[800px] h-[400px]' width={800} height={400} alt="image"/>
        <p className='absolute w-full top-2/3 text-center font-semibold text-yellow-600  text-xl'>{sliderData.find(obj=>obj.id==indexSlider).description}</p>
        <button onClick={()=>toggleImage(-1)} className='absolute left-10 top-1/2 rounded-full  bg-transparent p-4'><Image   src={PrevIcon} width={40} height={20} alt='left'/></button>
        <button onClick={()=>toggleImage(+1)} className='absolute right-10 top-1/2 rounded-full   bg-transparent p-4'><Image  src={NextIcon} width={40} height={20} alt='next'/></button>
        <div className='flex justify-center items-center gap-2 absolute bottom-2  w-full'>
          {
            sliderData.map((slider,index)=>(
              <span key={index} onClick={()=>setIndexSlider(index+1)} className={`${indexSlider==index+1 ? `bg-slate-100`:`bg-slate-950`} rounded-full  p-2 cursor-pointer`}></span>
            ))
          }
          
          
        </div>
      </div>
    </main>
  )
}
