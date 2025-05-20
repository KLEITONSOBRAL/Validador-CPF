function validarCPF(cpf) {
    if (!cpf || typeof cpf !== "string") return false;
  
    const cleaned = cpf.replace(/\D/g, "");
    if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) return false;
  
    const calcCheckDigit = (base, factor) => {
      let sum = 0;
      for (let i = 0; i < base.length; i++) {
        sum += parseInt(base.charAt(i)) * factor--;
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
  
    const base = cleaned.slice(0, 9);
    const digit1 = calcCheckDigit(base, 10);
    const digit2 = calcCheckDigit(base + digit1, 11);
  
    return cleaned === base + digit1 + digit2;
  }
  
  function mostrarResultado(texto, valido) {
    const resultado = document.getElementById("resultado");
    resultado.textContent = texto;
    resultado.className = valido ? "valid" : "invalid";
  }
  
  function rodarTestes() {
    const resultados = [];
  
    const test = (input, esperado) => {
      const resultado = validarCPF(input);
      const passou = resultado === esperado;
      resultados.push(`${passou ? "✅" : "❌"} "${input}" → ${resultado} (esperado: ${esperado})`);
    };
  
    // CPFs inválidos (sequências)
    test("11111111111", false);
    test("22222222222", false);
    test("99999999999", false);
  
    // Formato inválido
    test("123.456.789-00", false);
  
    // Letras e símbolos
    test("abc123xyz", false);
    test("12345@6789", false);
  
    // Quantidade incorreta de dígitos
    test("123", false);
    test("123456789123", false);
  
    // Vazio e nulo
    test("", false);
    test(null, false);
  
    // CPFs válidos
    test("52998224725", true);
    test("15350946056", true);
  
    document.getElementById("testes").textContent = resultados.join("\n");
  }
  
  // Eventos
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnValidar").addEventListener("click", () => {
      const cpf = document.getElementById("cpfInput").value;
      const valido = validarCPF(cpf);
      mostrarResultado(valido ? "CPF VÁLIDO" : "CPF INVÁLIDO", valido);
    });
  
    document.getElementById("btnTestes").addEventListener("click", () => {
      rodarTestes();
    });
  });
  