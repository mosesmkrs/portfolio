
"use client"
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

import { motion } from 'framer-motion'; // Assuming you're using React Router
import Link from 'next/link';
import Load from '@/components/loading';
import Image from 'next/image';
import '@/components/page.css'





export default function Home() {
  return (
    <>
     <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

     <header className="w-full p-4 bg-gradient-radial from-gray-800 to-black  text-center sticky top-2 z-50 flex justify-around items-center  hover:shadow-white hover:shadow-md">
      <motion.h1 className='justify-start' initial={{ y: -250 }} animate={{ y: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}>
       <Link href={'#hero'}><span className='flex justify-center items-center text-xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-red-900 to-red-300 animate-pulse '><span className='hover:shadow-lg hover:shadow-green-700 hover:text-transparent hover:bg-clip-text hover:bg-green-300'>MKRS</span><Image src="/images/star.png" alt="star"  width={30} height={30}/><Load/></span></Link>
      </motion.h1>
      <nav className="flex text-blue-400 font-bold">
        <Link href="#about" className="mx-4 hover:text-blue-300 ">
          About Me
        </Link>
        <Link href="#projects" className="mx-4 hover:text-blue-300 ">
          Projects
        </Link>
        <Link href="#contact" className="mx-4 hover:text-blue-300 ">
          Contact
        </Link>
      </nav>
    </header>
      <section id='hero'><Hero /></section>
      <hr className="w-5/6 mx-auto " />
      <section id='about'><About /></section>
       <hr className="w-5/6 mx-auto " />
      <section id='projects'><Projects /></section>
       <hr className="w-5/6 mx-auto " />
      <section id='contact'><Contact /></section>
    </>
  );
}

