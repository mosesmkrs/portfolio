/* eslint-disable @next/next/no-img-element */
"use client"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Marquee from './Marquee';

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
      <div
      >
        <h2 className="text-4xl mb-4">About Me</h2>
        <p className="text-xl mx-auto max-w-xl">
          I am a passionate Full Stack Developer with expertise in both web and blockchain technologies. I love creating
          interactive and user-friendly applications.
        </p>
      </div>

      {/* Technical Skillset Section */}
      <div className="my-16 ">
        <h3 className="text-2xl mb-8">Technical Skillset</h3>
        <Marquee 
          direction="ltr"
          velocity={30}
          scatterRandomly={false}
          resetAfterTries={100}
          onInit={() => console.log('Marquee initialized')}
          onFinish={({ totalTries }) => console.log(`Marquee finished after ${totalTries} tries`)}
          
        >
          <img src="/images/html.png" alt="HTML Logo" className="h-12 mx-2" />
          <img src="/images/react.png" alt="React Logo" className="h-12 mx-2" />
          <img src="/images/next.png" alt="Next.js Logo" className="h-12 mx-2" />
          <img src="/images/css.png" alt="CSS Logo" className="h-12 mx-2" />
          <img src="/images/js.png" alt="Javascript Logo" className="h-12 mx-2" />
          <img src="/images/Blockchain.png" alt="Blockchain Logo" className="h-12 mx-2" />
          <img src="/images/nodejs.webp" alt="Node.js Logo" className="h-12 mx-2" />
          <img src="/images/Sql.png" alt="SQL Logo" className="h-12 mx-2" />
          <img src="/images/firebase.png" alt="Firebase Logo" className="h-12 mx-2" />
          <img src="/images/python.png" alt="Python Logo" className="h-12 mx-2" />
          <img src="/images/cpp.png" alt="C++ Logo" className="h-12 mx-2" />
          <img src="/images/sol.png" alt="Solidity Logo" className="h-12 mx-2" />
          <img src="/images/eth.png" alt="Ethereum Logo" className="h-12 mx-2" />
          <img src="/images/ts.png" alt="Typescript Logo" className="h-12 mx-2" />
          <img src="/images/C_Logo.png" alt="C Logo" className="h-12 mx-2" />


        </Marquee>

        <ul className="text-left text-md mx-auto max-w-xl my-4">
          <SkillProgress skill="HTML" level="90%" />
          <SkillProgress skill="React.js" level="85%" />
          <SkillProgress skill="Next.js" level="80%" />
          <SkillProgress skill="CSS" level="86%" />
          <SkillProgress skill="Javascript" level="70%" />
          <SkillProgress skill="Typescript" level="62%" />
          <SkillProgress skill="Blockchain" level="50%" />
          <SkillProgress skill="Node.js" level="66%" />
          <SkillProgress skill="SQL" level="60%" />
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
