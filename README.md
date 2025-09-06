# Web Workers Demo - YouTube Tutorial

Demonstração simples de Web Workers em Nuxt 3 com TypeScript para mostrar a comunicação básica entre main thread e workers.

## 🎯 Objetivo

Mostrar como usar Web Workers para:
1. **API Worker**: Fazer requisições HTTP sem bloquear a UI
2. **CPU Worker**: Executar cálculos pesados em background

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## 📁 Estrutura do Projeto

```
├── app/
│   └── pages/
│       └── index.vue           # Página principal com demos
├── public/
│   └── workers/
│       ├── api-worker.js       # Worker para requisições HTTP
│       └── cpu-worker.js       # Worker para cálculos pesados
└── nuxt.config.ts
```

## 🔄 Como Funciona

### API Worker
```javascript
// Main Thread → Worker
worker.postMessage({ url: 'https://api.example.com/data' })

// Worker → Main Thread  
self.postMessage({ success: true, data: responseData })
```

### CPU Worker
```javascript
// Main Thread → Worker
worker.postMessage({ number: 35 })

// Worker → Main Thread
self.postMessage({ success: true, result: fibonacciResult })
```

## 🎬 Para o Vídeo

### Pontos a demonstrar:

1. **Interface Responsiva**: A animação continua fluida durante processamentos
2. **Comunicação Simples**: postMessage() nos dois sentidos
3. **Tratamento de Erros**: Workers podem falhar e reportar erros
4. **Casos de Uso**: Quando usar cada tipo de worker

### Código para mostrar:

1. **index.vue**: Como criar workers e comunicar
2. **api-worker.js**: Worker fazendo fetch()
3. **cpu-worker.js**: Worker fazendo cálculo pesado
4. **DevTools**: Console mostrando mensagens dos workers

## 🛠️ Tecnologias

- **Nuxt 3**: Framework Vue.js
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **Web Workers**: Processamento em background

## 📝 Conceitos Explicados

- **Main Thread vs Worker Thread**
- **postMessage() / onmessage**
- **Transferable Objects**
- **Quando usar Workers**
- **Limitações dos Workers**
