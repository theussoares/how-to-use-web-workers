# Web Workers in Nuxt 3

A small demo of how to use **Web Workers** in Nuxt 3 + TypeScript to keep the UI responsive while doing heavy work off the main thread.

## What it shows

1. **API worker**: makes HTTP requests without blocking the UI.
2. **CPU worker**: runs a heavy computation (Fibonacci) in the background.

The page keeps an animation running while the workers process, so you can see the main thread staying free.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
```

## Project structure

```
├── app/pages/index.vue          # demo page: creates workers and handles messages
├── public/workers/
│   ├── api-worker.js            # fetch() inside a worker
│   └── cpu-worker.js            # heavy computation inside a worker
└── nuxt.config.ts
```

## How it works

Main thread and worker communicate only through messages.

```js
// API worker
worker.postMessage({ url: 'https://api.example.com/data' })   // main -> worker
self.postMessage({ success: true, data: responseData })        // worker -> main

// CPU worker
worker.postMessage({ number: 35 })                             // main -> worker
self.postMessage({ success: true, result: fibonacciResult })   // worker -> main
```

Workers can fail, so both report errors back to the main thread instead of crashing silently.

## Key concepts

- Main thread vs. worker thread
- `postMessage()` / `onmessage`
- Transferable objects
- When to use workers, and their limitations (no DOM access)

## Tech

Nuxt 3, TypeScript, Tailwind CSS, Web Workers API.
