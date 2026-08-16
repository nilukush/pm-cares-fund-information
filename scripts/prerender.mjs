/**
 * Post-build prerender step: injects the server-rendered App markup into
 * dist/index.html so crawlers without JavaScript see the full content.
 *
 * Run automatically as the last step of `npm run build`.
 */
import { build } from 'esbuild'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
// CJS output: bundled react-dom/server legitimately require()s Node builtins,
// which is only legal in CommonJS.
const outfile = resolve(root, '.prerender/app.cjs')
mkdirSync(dirname(outfile), { recursive: true })

await build({
  entryPoints: [resolve(root, 'src/prerender-entry.tsx')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  outfile,
  logLevel: 'silent',
})

const mod = await import(pathToFileURL(outfile).href)
const html = mod.default?.html ?? mod.html
if (typeof html !== 'string' || html.length === 0) {
  throw new Error('prerender: rendered HTML string missing from entry output')
}

const indexFile = resolve(root, 'dist/index.html')
let doc = readFileSync(indexFile, 'utf8')
const shell = '<div id="root"></div>'
if (!doc.includes(shell)) {
  throw new Error('prerender: root div not found — has the HTML shell changed?')
}
doc = doc.replace(shell, `<div id="root">${html}</div>`)
writeFileSync(indexFile, doc)
console.log(`prerender: injected ${html.length} chars of static content into dist/index.html`)
