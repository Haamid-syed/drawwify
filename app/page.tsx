'use client'

import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { shapes } from '@/lib/ydoc'

export default function Page() {
  const [renderTick, setRenderTick] = useState(0)

  useEffect(() => {
    const observer = () => {
      setRenderTick(t => t + 1)
    }

    shapes.observe(observer)

    return () => shapes.unobserve(observer)
  }, [])

  const addRect = () => {
    const shape = new Y.Map()

    shape.set('id', crypto.randomUUID())
    shape.set('type', 'rect')
    shape.set('x', 100)
    shape.set('y', 100)
    shape.set('width', 150)
    shape.set('height', 100)
    shape.set('color', 'blue')

    shapes.push([shape])
  }

  const allShapes = shapes.toArray()

  return (
    <div>
      <button onClick={addRect}>Add Rectangle</button>

      <div style={{ position: 'relative', height: 600 }}>
        {allShapes.map((shape, i) => {
          const data = shape.toJSON()

          return (
            <div
              key={data.id}
              style={{
                position: 'absolute',
                left: data.x,
                top: data.y,
                width: data.width,
                height: data.height,
                background: data.color
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
