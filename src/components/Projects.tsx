"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from 'clsx-tailwind-merge';

const projects = [
  {
    title: 'SmartContract generator',
    description: 'BlockChain, Nextjs',
    image: '/images/block.png',
    url:'https://board-wine-kappa.vercel.app/wizard',
    color: 'green'
  },
  {
    title: 'NFT Marketplace',
    description: 'BlockChain,Nextjs,Cardano, Etherium',
    image: '/images/nft.png',
    url:'https://newnft-blue.vercel.app/home',
    color: 'red'
  },
  {
    title: 'B.JA. Power Solution Limited',
    description: 'React, Javascript',
    image: '/images/bja3.jpg',
    url:'https://bja-power-limited.vercel.app/',
    color: 'purple'
  },
  {
    title: 'Personal ToDo App',
    description: 'React',
    image: '/images/todo.png',
    url:'https://to-do-app-roan-nu.vercel.app/',
    color: 'blue'
  },
  {
    title: 'Movies App',
    description: 'React, APIs',
    image: '/images/movie.jpeg',
    url:'https://movie-app-chi-red.vercel.app/',
    color: 'pink'
  },
  {
    title: 'MongoDB CRUD',
    description: 'React, MongoDB',
    image: '/images/mongo.png',
    url:'https://mongo-crud-chi.vercel.app/',
    color: 'yellow'
  },
  {
    title: 'Firebase CRUD',
    description: 'React, Firebase',
    image: '/images/fire.png',
    url:'https://firebase-crud-two.vercel.app/Home',
    color: 'teal'
  },
  {
    title: 'Decentralised Lottery',
    description: 'Blockchain,Hardhat, Solidity, Javascript,Etherium',
    image: '/images/lott.png',
    url:'https://steep-king-5983.on.fleek.co/',
    color: 'gold'
  },
  {
    title: 'Decentralised Fund Me',
    description: 'Blockchain,Hardhat, Solidity, Javascript,Etherium',
    image: '/images/fund.png',
    url:'https://frontend-fund-me.vercel.app/',
    color: 'sky'
  },
  {
    title: 'Farmstead Fellowship Database',
    description: 'Next.js, SQL',
    image: '/images/farm.png',
    url:'https://sql-project-frontend.vercel.app/',
    color: 'green'
  },
  {
    title: 'Authentication App',
    description: 'Next.js, SQL, Prisma',
    image: '/images/auth.png',
    url:'https://next-auth-five-red.vercel.app/',
    color: 'green'
  },
  {
    title: 'AWWonders App',
    description: 'React, Javascript',
    image: '/images/wonder.png',
    url:'https://aw-wonders-frontend.vercel.app/',
    color: 'green'
  },
  // Add more projects here
];

const Projects = () => {
  return (
    <section className="p-16 text-center">
      <h2 className="text-4xl mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {projects.map((project, index) => (
          <Link href={project.url}  target="_blank" rel="noopener noreferrer"  key={index}>
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={cn(' border  rounded-lg bg-gradient-radial from-gray-800 to-black  hover:shadow-lg ',{
              'hover:shadow-green-700 border-green-600 ': index === 0,
              'hover:shadow-red-700 border-red-600 ': index === 1 ,
              'hover:shadow-purple-700 border-purple-600 ': index === 2,
              'hover:shadow-blue-700 border-blue-600 ': index === 3,
              'hover:shadow-pink-700 border-pink-600 ': index === 4,
              'hover:shadow-yellow-700 border-yellow-600 ': index === 5,
              'hover:shadow-teal-700 border-teal-600 ': index === 6,
              'hover:shadow-orange-700 border-orange-600 ': index === 7,
              'hover:shadow-sky-700 border-sky-600 ': index === 8,
              'hover:shadow-green-900 border-green-700 ': index === 9,
              'hover:shadow-amber-900 border-amber-700 ': index === 10,
              'hover:shadow-lime-700 border-lime-600 ': index === 11,
            })}>
              <Image width={500} height={500} src={project.image} alt={project.title} className="rounded-t-lg object-cover" />
              <h3 className={cn('mt-4 text-2xl font-bold', {
                'hover:text-green-600 ': index === 0,
                'hover:text-red-600 ': index === 1 ,
                'hover:text-purple-600 ': index === 2,
                'hover:text-blue-600 ': index === 3,
                'hover:text-pink-600 ': index === 4,
                'hover:text-yellow-600 ': index === 5,
                'hover:text-teal-600 ': index === 6,
                'hover:text-orange-600 ': index === 7,
                'hover:text-sky-600 ': index === 8,
                'hover:text-green-700 ': index === 9,
                'hover:text-amber-700 ': index === 10,
                'hover:text-lime-600 ': index === 11,

              })}>{project.title}</h3>
              <p className="mt-2 hover:text-sky-500 overflow-auto">{project.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Projects;
