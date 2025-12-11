'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Send, User, MessageSquare, Github, Linkedin, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      // Show validation error toast
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Show loading toast
      const loadingToast = toast.loading('Sending message...');

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        }),
      });

      const data = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.ok) {
        // Success
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        
        toast.success('Message sent successfully! Check your email for confirmation.', {
          duration: 5000
        });
      } else {
        // Server error
        toast.error(data.error || 'Failed to send message. Please try again.', {
          duration: 4000
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Network error. Please check your connection and try again.', {
        duration: 4000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    hidden: { opacity: 0, y: 30 },
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
    <section id="contact" className="py-20 bg-slate-dark-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-neon-magenta-500 rounded-full filter blur-3xl opacity-20 mix-blend-multiply" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyber-teal-500 rounded-full filter blur-3xl opacity-20 mix-blend-multiply" />
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
            Get In Touch
          </h2>
          <p className="text-slate-dark-300 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities, exciting projects, or just having a chat about technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.div variants={item} className="bg-slate-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-dark-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-dark-300 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-dark-400" size={20} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-2 bg-slate-dark-900/50 border rounded-lg text-white placeholder-slate-dark-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-slate-dark-700 focus:border-neon-magenta-500 focus:ring-neon-magenta-500/20'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-dark-300 mb-2">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-dark-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-2 bg-slate-dark-900/50 border rounded-lg text-white placeholder-slate-dark-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-slate-dark-700 focus:border-neon-magenta-500 focus:ring-neon-magenta-500/20'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-dark-300 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-slate-dark-400" size={20} />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className={`w-full pl-10 pr-4 py-2 bg-slate-dark-900/50 border rounded-lg text-white placeholder-slate-dark-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.message 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-slate-dark-700 focus:border-neon-magenta-500 focus:ring-neon-magenta-500/20'
                      }`}
                      placeholder="Your message here..."
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-dark-500">
                    {formData.message.length}/1000 characters
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-magenta-500 to-cyber-teal-500 text-white font-semibold rounded-lg shadow-neon hover:shadow-neon-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>

                              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={item} className="bg-slate-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-dark-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Let's Connect</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-semibold text-neon-magenta-400 mb-2">Direct Email</h4>
                  <a
                    href="mailto:karisamoses392@gmail.com"
                    className="inline-flex items-center gap-2 text-slate-dark-300 hover:text-white transition-colors"
                  >
                    <Mail size={20} />
                    karisamoses392@gmail.com
                  </a>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-cyber-teal-400 mb-2">Social Links</h4>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://github.com/mosesmkrs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-dark-700/50 border border-slate-dark-600 rounded-lg text-slate-dark-300 hover:border-neon-magenta-500/30 hover:text-neon-magenta-400 transition-all text-sm"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/moses-karisa-11526127a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-dark-700/50 border border-slate-dark-600 rounded-lg text-slate-dark-300 hover:border-cyber-teal-500/30 hover:text-cyber-teal-400 transition-all text-sm"
                    >
                      <Linkedin size={16} />
                      LinkedIn
                    </a>
                    <a
                      href="https://t.me/mosesmkrs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-dark-700/50 border border-slate-dark-600 rounded-lg text-slate-dark-300 hover:border-blue-500/30 hover:text-blue-400 transition-all text-sm"
                    >
                      <MessageCircle size={16} />
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-slate-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-dark-700/50">
              <h3 className="text-xl font-bold text-white mb-3">Response Time</h3>
              <p className="text-slate-dark-300 text-sm">
                I typically respond to messages within 24-48 hours. For urgent matters, feel free to reach out via Telegram or LinkedIn for faster response.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
