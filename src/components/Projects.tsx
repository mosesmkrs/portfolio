"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from 'clsx-tailwind-merge';

const projects = [
  {
    title: 'Project 1',
    description: 'A web application built with React and Node.js',
    image: '/images/project.png',
    url:'https://www.google.com',
    color: 'green'
  },
  {
    title: 'Project ',
    description: 'A web application built with React and Node.js',
    image: '/images/project.png',
    url:'https://www.google.com',
    color: 'red'
  },
  {
    title: 'Project ',
    description: 'A web application built with React and Node.js',
    image: '/images/project.png',
    url:'https://www.google.com',
    color: 'purple'
  },
  {
    title: 'Project ',
    description: 'A web application built with React and Node.js',
    image: '/images/project.png',
    url:'https://www.google.com',
    color: 'blue'
  },
  {
    title: 'Project ',
    description: 'A web application built with React and Node.js',
    image: '/images/project.png',
    url:'https://www.google.com',
    color: 'pink'
  },
  {
    title: 'Project ',
    description: 'A web application built with React and Node.js',
    image: '/images/project.png',
    url:'https://www.google.com',
    color: 'yellow'
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
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={cn(' border  rounded-lg  hover:shadow-lg ',{
              'hover:shadow-green-700 border-green-600 bg-green-400': index === 0,
              'hover:shadow-red-700 border-red-600 bg-red-400': index === 1,
              'hover:shadow-purple-700 border-purple-600 bg-purple-400': index === 2,
              'hover:shadow-blue-700 border-blue-600 bg-blue-400': index === 3,
              'hover:shadow-pink-700 border-pink-600 bg-pink-400': index === 4,
              'hover:shadow-yellow-700 border-yellow-600 bg-yellow-400': index === 5,
            })}>
              <Image width={500} height={500} src={project.image} alt={project.title} className="rounded-t-lg object-cover" />
              <h3 className="mt-4 text-2xl">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Projects;
