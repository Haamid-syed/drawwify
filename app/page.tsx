"use client"

import * as Y from 'yjs';
import { useState, useEffect } from 'react';
import { todo } from 'node:test';

export default function Home() {
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const doc = new Y.Doc();
    const todos : any = doc.getArray("todos");
    const item = new Y.Map();
    item.set("text", "Buy milk");
    item.set("done", true);
    console.log(todos)
    setId(doc.clientID);
  }, []);

  return <>{id}</>;
}
