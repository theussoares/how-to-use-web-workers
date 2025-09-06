// CPU Worker - Versão simples para demonstração  
// Recebe número da main thread, calcula fibonacci e retorna resultado

console.log('CPU Worker iniciado')

// Função para calcular fibonacci (versão simples e pesada propositalmente)
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// Escuta mensagens da main thread
self.addEventListener('message', (event) => {
  const { number } = event.data
  
  console.log('Worker recebeu número:', number)
  
  try {
    // Calcula fibonacci (operação pesada)
    const result = fibonacci(number)
    
    // Envia sucesso de volta para main thread
    self.postMessage({
      success: true,
      result: result
    })
    
  } catch (error) {
    // Envia erro de volta para main thread
    self.postMessage({
      success: false,
      error: error.message
    })
  }
})
