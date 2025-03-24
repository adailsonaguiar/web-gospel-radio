import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        "short_name": "Gospel FM",
        "name": "Radio Gospel",
        "lang": "pt",
        "background_color": "#1447e6",
        "theme_color": "#1447e6",
        "dir": "ltr",
        "display": "standalone",
        "orientation": "portrait",
        "prefer_related_applications": false,
        "icons": [
            {
            "src": "image/android/android-launchericon-512-512.png",
            "sizes": "512x512",
            "type": "image/png"
            },
            {
            "src": "image/android/android-launchericon-192-192.png",
            "sizes": "192x192",
            "type": "image/png"
            },
            {
            "src": "image/android/android-launchericon-48-48.png",
            "sizes": "48x48",
            "type": "image/png"
            }
        ]
      },
      devOptions:{
        enabled: true
      }
    })
  ],
})
