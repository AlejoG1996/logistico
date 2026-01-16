import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: '/logistico/',
  server: {
    historyApiFallback: true, // 👈 para redirección de rutas
  }
  // base: '/Logitico_chatbot/',  // Nombre exacto de tu repositorio
  // build: {
  //   outDir: 'dist',
  //   assetsDir: 'assets'
  // }
})