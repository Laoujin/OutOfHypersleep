import { defineConfig } from 'vite'

// dev:all runs one Vite per deck; a shared dep cache makes their optimizers race on renaming node_modules/.vite/deps.
export default defineConfig({ cacheDir: process.env.VITE_CACHE_DIR })
