import { Inter } from 'next/font/google'
import TestComponent from '@/components/TestComponent'
import Timer from '@/components/Timer/Timer'
import dynamic from 'next/dynamic'
import {useState} from 'react'
import Face from '@/components/Visualiser/Face'
import Visualiser from '@/components/Visualiser/Visualiser'
import VirtualCube from '@/components/VirtualCube/VirtualCube'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [latestSolve, setLatestSolve] = useState<number>();

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-12 bg-white text-black ${inter.className}`}
    >

    <Visualiser scramble="" controls={ true }/>
      
    </main>

  )
}
