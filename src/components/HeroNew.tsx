'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowDown, ArrowUpRight, Mail, User, Code, Sparkles, Play, Pause, Music } from 'lucide-react';
import Image from 'next/image';

const HeroNew: React.FC = () => {
  const [currentFace, setCurrentFace] = useState(1);
  const [isAutoFlipping, setIsAutoFlipping] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 1.2]), { stiffness: 100, damping: 20 });

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
  }));

  // Auto-flip every 8 seconds
  useEffect(() => {
    if (!isAutoFlipping) return;
    
    const interval = setInterval(() => {
      setCurrentFace(prev => (prev + 1) % 2);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoFlipping]);

  // Handle manual flip
  const handleFlip = () => {
    setIsAutoFlipping(false);
    setCurrentFace(prev => (prev + 1) % 2);
  };

  // Handle music toggle
  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (isMusicPlaying) {
          audioRef.current.pause();
          setIsMusicPlaying(false);
        } else {
          // Ensure audio is loaded before playing
          if (audioRef.current.readyState === 0) {
            await audioRef.current.load();
          }
          await audioRef.current.play();
          setIsMusicPlaying(true);
        }
      } catch (error) {
        console.error('Audio playback error:', error);
        setIsMusicPlaying(false);
      }
    }
  };

  // Handle music end
  const handleMusicEnd = () => {
    setIsMusicPlaying(false);
  };

  // Face 1: Professional Hero
  const ProfessionalFace = () => (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.p
          className="text-base sm:text-lg md:text-xl text-cyber-teal-400 font-mono mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          // Software Engineer
        </motion.p>
        
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-neon-magenta-400 via-cyber-teal-400 to-neon-magenta-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          System Architect &
          <br />
          Scalability Expert
        </motion.h1>
        
        <motion.p
          className="text-base sm:text-lg md:text-xl text-slate-dark-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Building high-performance, distributed systems that scale to millions.
          Specialized in cloud architecture, microservices, and optimizing complex software ecosystems.
        </motion.p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.a
          href="https://docs.google.com/document/d/1NrDiFU_Kxsy4iYzthQBu1mGcS9bfep0m/edit?usp=sharing&ouid=102187367901630105378&rtpof=true&sd=true"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-gradient-to-r from-neon-magenta-500 to-cyber-teal-500 text-white font-semibold rounded-lg shadow-neon hover:shadow-neon-hover transition-all duration-300 inline-flex items-center"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-2">
            <ArrowUpRight size={20} />
            My Resume
          </span>
        </motion.a>
        
        <motion.button
          className="px-8 py-3 border-2 border-neon-magenta-500 text-neon-magenta-400 font-semibold rounded-lg hover:bg-neon-magenta-500/10 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span className="flex items-center gap-2">
            <Mail size={20} />
            Get In Touch
          </span>
        </motion.button>
      </motion.div>
    </div>
  );

  // Face 2: Personal Greeting
  const PersonalFace = () => (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left side - Photo */}
        <motion.div
          className="flex-1 text-center lg:text-left order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative inline-block mb-6">
            {/* Animated glow effect when music plays */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-magenta-500 to-cyber-teal-500 rounded-full blur-xl"
              animate={{
                opacity: isMusicPlaying ? [0.3, 0.8, 0.3] : 0.5,
                scale: isMusicPlaying ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isMusicPlaying ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
            
            {/* Circular animation container */}
            <motion.div
              className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-slate-dark-800 shadow-neon"
              animate={{
                rotate: isMusicPlaying ? 360 : 0,
                scale: isMusicPlaying ? [1, 1.05, 1] : 1,
              }}
              transition={{
                rotate: {
                  duration: 4,
                  repeat: isMusicPlaying ? Infinity : 0,
                  ease: "linear"
                },
                scale: {
                  duration: 1,
                  repeat: isMusicPlaying ? Infinity : 0,
                  ease: "easeInOut"
                }
              }}
            >
              <Image 
                src="/images/mosee.png" 
                alt="Moses Karisa" 
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            {/* Music notes animation */}
            {isMusicPlaying && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 60}deg) translateY(-100px)`,
                    }}
                    animate={{
                      y: [-20, -40, -20],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <Music className="text-neon-magenta-400" size={16} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right side - Personal Info */}
        <motion.div
          className="flex-1 text-center lg:text-right order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div className="flex items-center justify-center lg:justify-end gap-2 mb-4">
            <Sparkles className="text-neon-magenta-400" size={24} />
            <span className="text-lg md:text-xl text-cyber-teal-400 font-mono">Hello, I'm</span>
          </motion.div>
          
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 bg-gradient-to-r from-neon-magenta-400 via-cyber-teal-400 to-neon-magenta-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Moses Karisa
          </motion.h2>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl text-slate-dark-300 mb-4 sm:mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Passionate software engineer who loves building elegant solutions to complex problems. 
            I believe in clean code, continuous learning, and creating technology that makes a real impact.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-end mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {['Problem Solver', 'Team Player', 'Innovation Driven', 'Quality Focused'].map((trait, index) => (
              <span
                key={trait}
                className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-3 lg:py-1.5 rounded-full bg-slate-dark-800/50 border border-slate-dark-700 text-slate-dark-200 text-xs sm:text-sm font-medium"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                {trait}
              </span>
            ))}
          </motion.div>

          {/* Music Feature */}
          <motion.div
            className="mt-6 text-center lg:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-cyber-teal-400 font-mono mb-3">Wanna know my taste in music?</p>
            <motion.button
              onClick={toggleMusic}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-magenta-500 to-cyber-teal-500 text-white font-semibold rounded-lg shadow-neon hover:shadow-neon-hover transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isMusicPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isMusicPlaying ? 'Pause Music' : 'Play Music'}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-dark-950"
    >
      {/* Animated Background SVG */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="neonGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d646ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Animated Network Lines */}
          <motion.g
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {particles.map((particle, i) => (
              <motion.circle
                key={particle.id}
                cx={`${particle.x}%`}
                cy={`${particle.y}%`}
                r={particle.size}
                fill="url(#neonGradient)"
                filter="url(#glow)"
                animate={{
                  cx: [
                    `${particle.x}%`,
                    `${(particle.x + 20) % 100}%`,
                    `${particle.x}%`
                  ],
                  cy: [
                    `${particle.y}%`,
                    `${(particle.y + 20) % 100}%`,
                    `${particle.y}%`
                  ],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </motion.g>

          {/* Central Architecture Visualization */}
          <motion.g
            style={{ rotateX, scale }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.circle
              cx="50%"
              cy="50%"
              r="100"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="2"
              strokeDasharray="5 10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="150"
              fill="none"
              stroke="#d646ff"
              strokeWidth="1"
              strokeOpacity="0.3"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="200"
              fill="none"
              stroke="#14b8a6"
              strokeWidth="1"
              strokeOpacity="0.2"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </motion.g>
        </svg>
      </div>

      {/* Two-Faced Hero Content */}
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {currentFace === 0 ? (
            <motion.div
              key="professional"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <ProfessionalFace />
            </motion.div>
          ) : (
            <motion.div
              key="personal"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <PersonalFace />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Flip Button */}
      <motion.button
        onClick={handleFlip}
        className="absolute top-14 right-4 z-10 px-2 py-1 sm:px-3 sm:py-1.5 lg:px-2 lg:py-1 bg-slate-dark-800/80 backdrop-blur-sm border border-slate-dark-700 rounded-lg text-slate-dark-300 hover:text-neon-magenta-400 hover:border-neon-magenta-500/30 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-2 text-sm sm:text-base">
          <Code className="text-size-16" />
          {currentFace === 0 ? 'Personal' : 'Professional'}
        </span>
      </motion.button>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-slate-dark-400 text-sm">Scroll to explore</span>
          <ArrowDown className="text-neon-magenta-400" size={20} />
        </motion.div>
      </motion.div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onEnded={handleMusicEnd}
        loop={false}
        preload="metadata"
      >
        <source src="/audio/c9.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
};

export default HeroNew;
