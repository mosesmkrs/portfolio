"use client"
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section className="py-16 bg-gradient-radial from-sky-400 to-blue-800 text-white text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h2 className="text-4xl mb-4">Contact Me</h2>
        <p className="text-xl">
          Feel free to reach out to me at <a href="mailto:karisamoses392@gmail.com" className="underline">karisamoses392@gmail.com</a> or connect
          with me on social media.
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;
