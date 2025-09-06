<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">
        Web Workers - Comunicação Simples
      </h1>

      <!-- API Worker Demo -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">🌐 API Worker</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">URL da API:</label>
            <input 
              v-model="apiUrl" 
              type="text" 
              placeholder="https://jsonplaceholder.typicode.com/posts/1"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
              :disabled="isApiLoading"
            >
          </div>

          <button
            @click="fetchWithWorker"
            :disabled="isApiLoading || !apiUrl"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-md"
          >
            {{ isApiLoading ? 'Fazendo requisição...' : 'Fazer Requisição' }}
          </button>

          <div v-if="apiResult" class="bg-green-50 border border-green-200 rounded-md p-4">
            <h3 class="font-medium text-green-800 mb-2">✅ Sucesso:</h3>
            <pre class="text-sm text-green-700 overflow-auto max-h-32">{{ JSON.stringify(apiResult, null, 2) }}</pre>
          </div>

          <div v-if="apiError" class="bg-red-50 border border-red-200 rounded-md p-4">
            <h3 class="font-medium text-red-800 mb-2">❌ Erro:</h3>
            <p class="text-sm text-red-700">{{ apiError }}</p>
          </div>
        </div>
      </div>

      <!-- CPU Worker Demo -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">⚡ CPU Worker</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Número para calcular (fibonacci):</label>
            <input 
              v-model.number="fibNumber" 
              type="number" 
              min="1"
              max="50"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
              :disabled="isCpuLoading"
            >
          </div>

          <button
            @click="calculateWithWorker"
            :disabled="isCpuLoading || !fibNumber"
            class="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-md"
          >
            {{ isCpuLoading ? 'Calculando...' : 'Calcular Fibonacci' }}
          </button>

          <div v-if="cpuResult !== null" class="bg-green-50 border border-green-200 rounded-md p-4">
            <h3 class="font-medium text-green-800 mb-2">✅ Resultado:</h3>
            <p class="text-sm text-green-700">Fibonacci({{ fibNumber }}) = {{ cpuResult }}</p>
          </div>

          <div v-if="cpuError" class="bg-red-50 border border-red-200 rounded-md p-4">
            <h3 class="font-medium text-red-800 mb-2">❌ Erro:</h3>
            <p class="text-sm text-red-700">{{ cpuError }}</p>
          </div>
        </div>
      </div>

      <!-- UI Test -->
      <div class="mt-8 p-4 bg-blue-50 rounded-lg">
        <p class="text-blue-800 font-medium mb-2">🎯 Teste de UI Responsiva:</p>
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          <span class="text-blue-700">Esta animação deve continuar fluida durante os processamentos</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Estado para API Worker
const apiUrl = ref('https://jsonplaceholder.typicode.com/posts/1')
const isApiLoading = ref(false)
const apiResult = ref(null)
const apiError = ref('')

// Estado para CPU Worker  
const fibNumber = ref(35)
const isCpuLoading = ref(false)
const cpuResult = ref<number | null>(null)
const cpuError = ref('')

// Workers
let apiWorker: Worker | null = null
let cpuWorker: Worker | null = null

// Função para fazer requisição com worker
const fetchWithWorker = () => {
  if (!apiWorker) {
    apiWorker = new Worker('/workers/api-worker.js')
    
    apiWorker.onmessage = (event) => {
      const { success, data, error } = event.data
      
      isApiLoading.value = false
      
      if (success) {
        apiResult.value = data
        apiError.value = ''
      } else {
        apiError.value = error
        apiResult.value = null
      }
    }
  }
  
  isApiLoading.value = true
  apiResult.value = null
  apiError.value = ''
  
  // Envia URL para o worker
  apiWorker.postMessage({ url: apiUrl.value })
}

// Função para calcular com worker
const calculateWithWorker = () => {
  if (!cpuWorker) {
    cpuWorker = new Worker('/workers/cpu-worker.js')
    
    cpuWorker.onmessage = (event) => {
      const { success, result, error } = event.data
      
      isCpuLoading.value = false
      
      if (success) {
        cpuResult.value = result
        cpuError.value = ''
      } else {
        cpuError.value = error
        cpuResult.value = null
      }
    }
  }
  
  isCpuLoading.value = true
  cpuResult.value = null
  cpuError.value = ''
  
  // Envia número para o worker
  cpuWorker.postMessage({ number: fibNumber.value })
}

// Cleanup on unmount
onUnmounted(() => {
  if (apiWorker) apiWorker.terminate()
  if (cpuWorker) cpuWorker.terminate()
})
</script>