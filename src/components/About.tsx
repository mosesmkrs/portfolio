"use client"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillProgress = ({ skill, level }: any) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <li className='my-2'>
      {skill}
      <div className="bg-gray-300 h-2 rounded-full ">
        <motion.div
          ref={ref}
          className="bg-blue-400 shadow-sm shadow-blue-600 h-full rounded-full "
          initial={{ width: 0 }}
          animate={{ width: inView ? level : 0 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
      </div>
    </li>
  );
};

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-8 text-center bg-gradient-radial from-gray-800 to-black">
      <motion.div
        initial={{ x: '-100vw' }}
        animate={inView ? { x: 0 } : { x: '-100vw' }}
        transition={{ type: 'spring', stiffness: 20 }}
      >
        <h2 className="text-4xl mb-4">About Me</h2>
        <p className="text-xl mx-auto max-w-xl">
          I am a passionate Full Stack Developer with expertise in both web and blockchain technologies. I love creating
          interactive and user-friendly applications.
        </p>
      </motion.div>

      {/* Technical Skillset Section */}
      <div className="mt-8">
        <h3 className="text-2xl mb-2">Technical Skillset</h3>
        <ul className="text-left text-md mx-auto max-w-xl my-4">
          <SkillProgress skill="HTML" level="90%" />
          <SkillProgress skill="React.js" level="85%" />
          <SkillProgress skill="Next.js" level="80%" />
          <SkillProgress skill="CSS" level="86%" />
          <SkillProgress skill="Javascript" level="70%" />
          <SkillProgress skill="Blockchain" level="68%" />
          <SkillProgress skill="Node.js" level="66%" />
          <SkillProgress skill="SQL" level="60%" />
          <SkillProgress skill="Chainlink" level="55%" />
          <SkillProgress skill="Etherium.js" level="50%" />
          <SkillProgress skill="Python" level="40%" />
          <SkillProgress skill="C++" level="45%" />
          <SkillProgress skill="Solidity" level="20%" />
          {/* Add more skills with progress bars as needed */}
        </ul>
      </div>
    </section>
  );
};

export default About;
