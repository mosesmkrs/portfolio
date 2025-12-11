import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neon-magenta': {
          50: '#fdf0ff',
          100: '#f9e0ff',
          200: '#f2c1ff',
          300: '#ea9fff',
          400: '#e074ff',
          500: '#d646ff',
          600: '#c426eb',
          700: '#a41bc7',
          800: '#861da4',
          900: '#6e1f88',
          950: '#4a1558',
        },
        'cyber-teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        'slate-dark': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neon-glow": "radial-gradient(circle at center, rgba(214, 70, 255, 0.15), transparent 50%)",
        "cyber-glow": "radial-gradient(circle at center, rgba(20, 184, 166, 0.15), transparent 50%)",
      },
      boxShadow: {
        'neon': '0 0 20px rgba(214, 70, 255, 0.5), 0 0 40px rgba(214, 70, 255, 0.3)',
        'neon-hover': '0 0 30px rgba(214, 70, 255, 0.7), 0 0 60px rgba(214, 70, 255, 0.4)',
        'cyber': '0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(20, 184, 166, 0.3)',
        'cyber-hover': '0 0 30px rgba(20, 184, 166, 0.7), 0 0 60px rgba(20, 184, 166, 0.4)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(214, 70, 255, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(214, 70, 255, 0.8), 0 0 50px rgba(214, 70, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
