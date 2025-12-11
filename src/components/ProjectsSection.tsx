'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowUpRight, X } from 'lucide-react';
import Image from 'next/image';

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  codeUrl: string;
  role: string;
  featured?: boolean;
};

const ProjectsSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'FinTech - Finance management platform',
      description: 'A high-performance financial operating system designed to unify the fragmented lives of modern entrepreneurs by managing distinct workspaces—such as farms, shops, and households—within a single, secure platform. It eliminates wealth leakage by meticulously tracking even the smallest micro-transactions, ensuring that granular expenses like airtime never erode your bottom line. With enterprise-grade role-based access and a context-aware AI assistant, it allows users to collaborate with teams and separate their concerns while maintaining a complete, leak-proof view of their total net worth.',
      tags: ['NextJs', 'React', 'Vercel', 'Shadcn UI', 'Tailwind CSS','Clerk','OpenAI'],
      image: '/images/fintech.png',
      demoUrl: 'https://finance-tracker-nine-alpha.vercel.app/',
      codeUrl: '',
      role: 'Founder & Lead Developer',
      featured: true,
    },
    {
      id: 2,
      title: 'UoN Realtime Virtual Assistant',
      description: "A revolutionary virtual assistant that provides UoN students with confidential, AI-powered answers to sensitive university questions they can't ask publicly. Built with Next.js and OpenAI's GPT-4o-mini, it features secure authentication via Clerk, intelligent question matching using Jaccard similarity, and an admin dashboard for dynamic knowledge base updates. The system automatically logs unanswered questions for administrators to address, ensuring students get expert guidance on topics like exam failures, research opportunities, and financial aid without judgment or office visits.",
      tags: ['NextJs', 'React', 'TypeScript', 'OpenAI', 'WebSockets'],
      image: '/images/assistant.png',
      demoUrl: 'https://uon-virtual-assistant.vercel.app/',
      codeUrl: '',
      role: 'Full Stack Developer',
      featured: true,
    },
    {
      id: 3,
      title: 'Visually Impaired Mobility App ',
      description: 'A mobile navigation app designed to help visually impaired individuals travel independently using Nairobi’s public transport system. It combines GTFS transit data with real-time GPS tracking to deliver accurate, hands-free navigation along matatu routes. The app provides verbal turn-by-turn guidance, journey progress prompts, and route alerts to keep users informed and safe throughout their commute. Built with accessibility at the core, it enables seamless mobility without relying on visual interaction.',
      tags: ['Kotlin', 'Firebase', 'Mobile App', 'Jetpack Compose', 'Android Studio'],
      image: '/images/visualimpaired.png',
      demoUrl: 'http://41.89.64.11/visually-impaired-appv5.apk',
      codeUrl: 'https://github.com/mosesmkrs/VisuallyImpairedMobilityApp',
      role: 'Full Stack Developer',
      featured: true,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-slate-dark-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-magenta-500 rounded-full filter blur-3xl opacity-20 mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyber-teal-500 rounded-full filter blur-3xl opacity-20 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-neon-magenta-400 to-cyber-teal-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-slate-dark-300 max-w-2xl mx-auto">
            A selection of projects that demonstrate my expertise in building scalable, high-performance applications.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={item}
              className="group relative bg-slate-dark-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-dark-700/50 hover:border-neon-magenta-500/30 transition-all duration-300 hover:shadow-neon/10 cursor-pointer"
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta-500/10 to-cyber-teal-500/10" />
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.parentElement?.querySelector('.placeholder');
                    if (placeholder) {
                      (placeholder as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="placeholder absolute inset-0 flex items-center justify-center text-slate-dark-400" style={{ display: 'none' }}>
                  <span className="text-sm font-mono">Project Preview</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-dark-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 text-xs rounded-full bg-slate-dark-700/80 text-slate-dark-200">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="px-1.5 py-0.5 text-xs rounded-full bg-slate-dark-700/80 text-slate-dark-400">
                          +{project.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {project.demoUrl && project.demoUrl !== '#' && project.demoUrl !== '' ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-neon-magenta-500 rounded hover:bg-neon-magenta-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={12} />
                          Demo
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-dark-500 bg-slate-dark-800/50 rounded cursor-not-allowed">
                          <ExternalLink size={12} />
                          Demo
                        </div>
                      )}
                      
                      {project.codeUrl && project.codeUrl !== '#' && project.codeUrl !== '' ? (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-slate-dark-700 rounded hover:bg-slate-dark-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={12} />
                          Code
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-dark-500 bg-slate-dark-800/50 rounded cursor-not-allowed">
                          <Github size={12} />
                          Code
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-neon-magenta-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-slate-dark-400">{project.role}</span>
                </div>
                <p className="text-slate-dark-300 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-dark-400">
                  <span className="inline-flex items-center gap-1 group/readmore">
                    Read more
                    <ArrowUpRight 
                      size={16} 
                      className="transition-transform group-hover/readmore:translate-x-0.5 group-hover/readmore:-translate-y-0.5" 
                    />
                  </span>
                  <div className="flex gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-slate-dark-700/50 text-slate-dark-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta-500/5 to-cyber-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.article>
          ))}
        </motion.div>
        
        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-slate-dark-900 border border-slate-dark-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative h-64 bg-gradient-to-br from-neon-magenta-500/20 to-cyber-teal-500/20 rounded-t-xl overflow-hidden">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-slate-dark-800/80 backdrop-blur-sm rounded-lg text-slate-dark-400 hover:text-white hover:bg-slate-dark-800 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <Image 
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.parentElement?.querySelector('.modal-placeholder');
                      if (placeholder) {
                        (placeholder as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="modal-placeholder absolute inset-0 flex items-center justify-center text-slate-dark-400" style={{ display: 'none' }}>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-slate-dark-800/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <ArrowUpRight size={32} className="text-neon-magenta-400" />
                      </div>
                      <span className="text-sm font-mono">Project Preview</span>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                    <div className="flex items-center gap-4 text-slate-dark-400">
                      <span className="px-3 py-1 bg-slate-dark-800 rounded-full text-sm font-medium">
                        {selectedProject.role}
                      </span>
                      {selectedProject.featured && (
                        <span className="px-3 py-1 bg-neon-magenta-500/20 text-neon-magenta-400 rounded-full text-sm font-medium">
                          Featured Project
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">Project Overview</h3>
                    <p className="text-slate-dark-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-slate-dark-800 border border-slate-dark-700 rounded-lg text-slate-dark-300 text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && selectedProject.demoUrl !== '' ? (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-neon-magenta-500 to-cyber-teal-500 text-white font-semibold rounded-lg hover:shadow-neon transition-all duration-300 inline-flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={20} />
                        View Live Demo
                      </a>
                    ) : (
                      <div className="flex-1 px-6 py-3 bg-slate-dark-800/50 border border-slate-dark-700 text-slate-dark-500 font-medium rounded-lg cursor-not-allowed inline-flex items-center justify-center gap-2">
                        <ExternalLink size={20} />
                        Demo Not Available
                      </div>
                    )}
                    
                    {selectedProject.codeUrl && selectedProject.codeUrl !== '#' && selectedProject.codeUrl !== '' ? (
                      <a
                        href={selectedProject.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-slate-dark-800 border border-slate-dark-700 text-white font-semibold rounded-lg hover:bg-slate-dark-700 transition-all duration-300 inline-flex items-center justify-center gap-2"
                      >
                        <Github size={20} />
                        View Source Code
                      </a>
                    ) : (
                      <div className="flex-1 px-6 py-3 bg-slate-dark-800/50 border border-slate-dark-700 text-slate-dark-500 font-medium rounded-lg cursor-not-allowed inline-flex items-center justify-center gap-2">
                        <Github size={20} />
                        Source Code is Private
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
