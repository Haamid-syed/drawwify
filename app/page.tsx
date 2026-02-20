'use client'

import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { shapes } from '@/lib/ydoc'

export default function Page() {
  const [renderTick, setRenderTick] = useState(0)
  const [size, setSize] = useState<string>("")

  useEffect(() => {
    const observer = () => {
      setRenderTick(t => t + 1)
    }

    shapes.observe(observer)

    return () => shapes.unobserve(observer)
  }, [])

  const addRect = () => {
  const parsedSize = Number(size)

  if (!size || isNaN(parsedSize) || parsedSize <= 0) return

  const shape = new Y.Map()

  shape.set('id', crypto.randomUUID())
  shape.set('type', 'rect')
  shape.set('x', 100)
  shape.set('y', 100)
  shape.set('width', parsedSize)
  shape.set('height', parsedSize)
  shape.set('color', 'blue')

  shapes.push([shape])
}

  const sizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSize(e.target.value)
}

  const allShapes = shapes.toArray()

  return (
    <div>
      <input type="number" value={size} onChange={sizeChange}/>
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
