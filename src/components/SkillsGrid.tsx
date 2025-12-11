'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Server, Database, Cloud, GitBranch } from 'lucide-react';

type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: {
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    icon?: React.ReactNode;
  }[];
};

const SkillsGrid: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: <Code className="w-5 h-5" />,
      skills: [
        { name: 'NextJs', proficiency: 'Expert' },
        { name: 'React', proficiency: 'Advanced' },
        { name: 'JavaScript', proficiency: 'Intermediate' },
        { name: 'TypeScript', proficiency: 'Advanced' },
        { name: 'Tailwind CSS', proficiency: 'Advanced' },
        { name: 'Shadcn UI', proficiency: 'Advanced' },
      ],
    },
    {
      title: 'Backend',
      icon: <Server className="w-5 h-5" />,
      skills: [
        { name: 'Node.js', proficiency: 'Expert' },
        { name: 'Express.js', proficiency: 'Advanced' },
        { name: 'Python', proficiency: 'Intermediate' },
        { name: 'REST APIs', proficiency: 'Advanced' },

      ],
    },
    {
      title: 'Databases',
      icon: <Database className="w-5 h-5" />,
      skills: [
        { name: 'PostgreSQL', proficiency: 'Expert' },
        { name: 'MongoDB', proficiency: 'Advanced' },
        { name: 'Prisma', proficiency: 'Advanced' },
        { name: 'MySQL', proficiency: 'Intermediate' },
        { name: 'Supabase', proficiency: 'Advanced' },
      ],
    },
    {
      title: 'Architecture',
      icon: <GitBranch className="w-5 h-5" />,
      skills: [
        { name: 'System Design', proficiency: 'Expert' },
        { name: 'Scalability', proficiency: 'Advanced' },
        { name: 'Security', proficiency: 'Advanced' },
        { name: 'Performance', proficiency: 'Advanced' },
        { name: 'Reliability', proficiency: 'Advanced' },
      ],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'Expert':
        return 'text-neon-magenta-400 border-neon-magenta-500/30 bg-neon-magenta-500/10';
      case 'Advanced':
        return 'text-cyber-teal-400 border-cyber-teal-500/30 bg-cyber-teal-500/10';
      case 'Intermediate':
        return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'Beginner':
        return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      default:
        return 'text-slate-dark-400 border-slate-dark-500/30 bg-slate-dark-500/10';
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-dark-900 relative overflow-hidden">
       

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-neon-magenta-400 to-cyber-teal-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Technical Expertise
          </motion.h2>
          <motion.p
            className="text-slate-dark-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I've worked with a wide range of technologies across the full stack. Here's a snapshot of my technical toolkit.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="bg-slate-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-dark-700/50 hover:border-neon-magenta-500/30 transition-all duration-300 hover:shadow-neon/10"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-neon-magenta-500/10 text-neon-magenta-400">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              
              <motion.div
                className="space-y-4 mt-6"
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name} 
                    variants={item} 
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-dark-800/50 border border-slate-dark-700/50 hover:border-slate-dark-600/50 transition-all duration-300"
                  >
                    <span className="text-sm text-slate-dark-200 font-medium">{skill.name}</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getProficiencyColor(skill.proficiency)}`}>
                      {skill.proficiency}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional tech stack tags */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-lg font-medium text-slate-dark-300 mb-6">Also experienced with</h4>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              'TypeScript',  'Redux', 
               'Prisma', 'Docker', 'AWS','MongoDB','Kotlin','Clerk','OpenAI', 
               'OAuth', 'JWT', "FireBase",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 text-sm rounded-full bg-slate-dark-800 text-slate-dark-200 border border-slate-dark-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.5 + (index * 0.03),
                  type: 'spring',
                  stiffness: 100,
                  damping: 10
                }}
                whileHover={{
                  y: -2,
                  backgroundColor: 'rgba(214, 70, 255, 0.1)',
                  borderColor: 'rgba(214, 70, 255, 0.5)',
                  color: '#fff',
                  transition: { duration: 0.2 }
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsGrid;
