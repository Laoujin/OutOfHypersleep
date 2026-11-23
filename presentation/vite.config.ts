import { defineConfig } from 'vite'
import { parse } from 'yaml'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  server: { fs: { allow: [fileURLToPath(new URL('..', import.meta.url))] } },
  plugins: [{
    name: 'yaml',
    transform(code, id) {
      if (id.endsWith('.yaml')) return { code: `export default ${JSON.stringify(parse(code))}`, map: null }
    },
  }],
})
