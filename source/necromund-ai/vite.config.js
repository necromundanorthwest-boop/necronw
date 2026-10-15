import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({ plugins: [react(), VitePWA({ registerType: 'autoUpdate', includeAssets: ['icon.svg'], manifest: { name: 'N2 // NECROMUND:AI', short_name: 'N2 AI', description: 'Deterministic tabletop opponent-management field terminal.', theme_color: '#111511', background_color: '#111511', display: 'standalone', orientation: 'portrait', icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] } })] });
