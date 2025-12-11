
'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Hero from '@/components/HeroNew';
import SkillsGrid from '@/components/SkillsGrid';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <SkillsGrid />
          <ProjectsSection />
          <ContactSection />
        </motion.div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #475569',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#1e293b',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1e293b',
              },
            },
          }}
        />
      </Layout>
    </AnimatePresence>
  );
}

