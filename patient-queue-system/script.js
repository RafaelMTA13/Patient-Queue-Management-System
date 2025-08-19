// Tela do paciente
const form = document.getElementById("formPaciente");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const paciente = {
      nome: document.getElementById("nome").value,
      idade: document.getElementById("idade").value,
      cpf: document.getElementById("cpf").value,
      telefone: document.getElementById("telefone").value,
    };

    const resp = await fetch("/api/pacientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paciente),
    });

    if (resp.ok) {
      document.getElementById("mensagem").textContent =
        "Você entrou na fila de espera! Aguarde ser chamado.";
      form.reset();
    } else {
      alert("Erro ao cadastrar paciente!");
    }
  });
}

// Tela do médico
async function carregarFila() {
  const lista = document.getElementById("fila");
  if (!lista) return;

  const resp = await fetch("/api/pacientes");
  const pacientes = await resp.json();

  lista.innerHTML = "";
  pacientes.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}º - ${p.nome}, ${p.idade} anos, CPF: ${p.cpf}, Tel: ${p.telefone}`;
    lista.appendChild(li);
  });
}

// Atualiza fila a cada 3 segundos
setInterval(carregarFila, 3000);
carregarFila();
