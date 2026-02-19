'use client'

import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'

// singleton pattern
let doc: Y.Doc

if (!(globalThis as any).__ydoc) {
  doc = new Y.Doc()
  ;(globalThis as any).__ydoc = doc

  // attach persistence
  new IndexeddbPersistence('whiteboard-local', doc)
} else {
  doc = (globalThis as any).__ydoc
}

export const ydoc = doc
export const shapes = ydoc.getArray<Y.Map<any>>('shapes')
