/** @type {import('tailwindcss').Config} */
export default {
  important: '#root', // Escopo apenas para elementos dentro de #root
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'] // Adicione aqui em vez do CSS global
      },
      colors: {
        // Padronize todas as cores aqui
        chat: '#1C68BE',
        flow: '#83E253',
        erp: '#0C2941',
        app: '#683482',
        // Mantenha as básicas
        white: '#FFFFFF',
        black: '#000000'
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out' // Adicione as animações aqui
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },

  safelist: [
    // Padronize para bg-{modulo} e text-{modulo}
    'bg-chat', 'bg-flow', 'bg-erp', 'bg-app',
    'text-chat', 'text-flow', 'text-erp', 'text-app',
    // Estados
    'hover:bg-chat', 'hover:bg-flow', 'hover:bg-erp', 'hover:bg-app',
    // Animações
    'animate-fadeIn'
  ],

  plugins: [],
}