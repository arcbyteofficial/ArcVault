import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'ArcVault - Secure Password Generator',
        short_name: 'ArcVault',
        description: 'Zero-knowledge architectural password manager and decentralized vault encryption handler.',
        theme_color: '#0A0A0A',
        background_color: '#0A0A0A',
        display: 'standalone',
        icons: [
          {
            src: 'ArcVault_black.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'ArcVault_black.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
