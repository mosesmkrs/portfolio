"use client"
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import './page.css'
import { FaInstagram, FaGithub, FaLinkedin, FaLinkedinIn, FaTelegram } from "react-icons/fa";

const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Change to false to trigger every time it comes into view
    threshold: 0.1, // Adjust the threshold as needed
  });

  return (
    <section
      ref={ref}
      className="md:flex grid justify-center  h-screen  bg-cover bg-center bg-gradient-radial from-gray-800 to-black"
     
    >

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="text-white w-full h-fit md:h-screen sm:translate-y-36 translate-y-8 px-12">
        <p className='text-2xl'>Hello👋, Iam</p>
        <h2 className="moses text-5xl mb-4 font-bold">Moses Karisa</h2>
        {inView && (
          <p className="text-2xl">
            <Typewriter
              words={["I'm a Full Stack Developer specialized in Web and Web3 technologies."]}
              loop={5}
              cursor
              cursorStyle="|"
              typeSpeed={100}
            />
          </p>
        )}
        <div className='icons m-8 flex'>
          <a href="https://github.com/mosesmkrs" className='mx-2'>
            <div className='layer'>
              <span className='shadow-md shadow-white text-white border-white'></span>
              <span className='shadow-md shadow-white text-white border-white'></span>
              <span className='shadow-md shadow-white text-white border-white'></span>
              <span className='shadow-md shadow-white text-white border-white'></span>
              <span className='fab shadow-md shadow-white text-white border-white m-0 p-0'><FaGithub/></span>
            </div>
          </a>
          <a href="https://t.me/mosesmkrs" className='mx-2'>
            <div className='layer'>
              <span className='shadow-md shadow-sky-500 text-sky-500 border-sky-500'></span>
              <span className='shadow-md shadow-sky-500 text-sky-500 border-sky-500'></span>
              <span className='shadow-md shadow-sky-500 text-sky-500 border-sky-500'></span>
              <span className='shadow-md shadow-sky-500 text-sky-500 border-sky-500'></span>
              <span className='fab shadow-md shadow-sky-500 text-sky-500 border-sky-500'><FaTelegram/></span>
            </div>
          </a>
          <a href="https://www.instagram.com/m.o.s.e.2.2.mkrs/" className='mx-2'>
            <div className='layer'>
              <span className='text-pink-500 shadow-md shadow-pink-500 border-pink-500'></span>
              <span className='text-pink-500 shadow-md shadow-pink-500 border-pink-500'></span>
              <span className='text-pink-500 shadow-md shadow-pink-500 border-pink-500'></span>
              <span className='text-pink-500 shadow-md shadow-pink-500 border-pink-500'></span>
              <span className='fab shadow-md text-pink-500  shadow-pink-500 border-pink-500'><FaInstagram/></span>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/moses-karisa-11526127a" className='mx-2'>
            <div className='layer'>
              <span className='shadow-md shadow-blue-800 text-blue-800 border-blue-800'></span>
              <span className='shadow-md shadow-blue-800 text-blue-800 border-blue-800'></span>
              <span className='shadow-md shadow-blue-800 text-blue-800 border-blue-800'></span>
              <span className='shadow-md shadow-blue-800 text-blue-800 border-blue-800'></span>
              <span className='fab shadow-md shadow-blue-800 text-blue-800 border-blue-800'><FaLinkedinIn/></span>
            </div>
          </a>
        </div>
      </motion.div>
      <div className='w-3/4 md:h-screen h-fit mx-auto'>
        <Image src="/images/project.png" alt="star" width={400} height={400} className='rounded-full translate-y-16'/>
      </div>
    </section>
  );
};

export default Hero;
