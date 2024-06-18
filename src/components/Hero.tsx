"use client"
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Change to false to trigger every time it comes into view
    threshold: 0.1, // Adjust the threshold as needed
  });

  return (
    <section
      ref={ref}
      className="md:flex block justify-center  h-screen  bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/profile.png")' }}
    >

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="text-white w-full h-screen translate-y-36 px-12">
        <p className='text-2xl'>Hello👋, Iam</p>
        <h2 className="text-5xl mb-4 font-bold ">Moses Karisa</h2>
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
      </motion.div>
      <div className='w-3/4 h-screen'>
        <Image src="/images/project.png" alt="star" width={400} height={400} className='rounded-full translate-y-16'/>
      </div>
    </section>
  );
};

export default Hero;
