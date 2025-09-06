// API Worker - Versão simples para demonstração
// Recebe URL da main thread, faz a requisição e retorna resultado

console.log('API Worker iniciado')

// Escuta mensagens da main thread
self.addEventListener('message', async (event) => {
  const { url } = event.data
  
  console.log('Worker recebeu URL:', url)
  
  try {
    // Faz a requisição
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Envia sucesso de volta para main thread
    self.postMessage({
      success: true,
      data: data
    })
    
  } catch (error) {
    // Envia erro de volta para main thread
    self.postMessage({
      success: false,
      error: error.message
    })
  }
})
