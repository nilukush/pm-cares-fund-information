import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Explicit cleanup: vitest runs with globals:false, so RTL's automatic
// afterEach cleanup is not registered on its own.
afterEach(cleanup)
