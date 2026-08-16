/**
 * Build-time SSR entry: renders the full App to a static HTML string so the
 * production index.html contains the entire text content (charts excluded —
 * they mount client-side). This is what search-engine and LLM crawlers that
 * do not execute JavaScript actually see.
 */
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export const html = renderToString(createElement(App))
