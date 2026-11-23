import { execSync } from 'node:child_process'
import { readdirSync } from 'node:fs'

const base = process.env.BASE || '/OutOfHypersleep/'
const decks = readdirSync('.').filter(f => f.endsWith('.md') && f !== 'slides.md' && f !== 'README.md').sort()

const run = cmd => { console.log(`> ${cmd}`); execSync(cmd, { stdio: 'inherit' }) }

run(`bunx slidev build slides.md --base ${base} --out dist`)
for (const f of decks) {
  const name = f.replace(/\.md$/, '')
  run(`bunx slidev build ${f} --base ${base}${name}/ --out dist/${name}`)
}
