
const estados = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins"
];


let estadoAtual = "";
const acertos = [];

function escolherEstado() {
  if (estados.length === 0) {
    document.getElementById("estadoAtual").textContent = "Concluído!";
    document.getElementById("feedback").textContent = "🏆 Você acertou todos os estados!";
    return;
  }

  estadoAtual = estados[Math.floor(Math.random() * estados.length)];
  document.getElementById("estadoAtual").textContent = estadoAtual;
  document.getElementById("feedback").textContent = "";
}

function normalizar(str) {
  return str.normalize("NFD").replace(/[^a-zA-Z]/g, "").toLowerCase();
}

function atualizarAcertosVisuais() {
  document.querySelectorAll("#mapa a").forEach(link => {
    const nome = link.dataset.title?.trim() || "";
    const path = link.querySelector("path");
    if (!path) return;

    if (acertos.includes(normalizar(nome))) {
      path.classList.add("acertou");
    } else {
      path.classList.remove("acertou");
    }
  });
}

// 🧠 Aplica o evento apenas uma vez por link
document.querySelectorAll("#mapa a").forEach(function (link) {
  const path = link.querySelector("path");
  if (!path) return;

  link.addEventListener("click", function (e) {
    e.preventDefault();

    const nomeEstado = link.dataset.title?.trim() || "desconhecido";
    const nomeNormalizado = normalizar(nomeEstado);
    const estadoNormalizado = normalizar(estadoAtual).replace(/\s/g, '');

    if (nomeNormalizado === estadoNormalizado) {
      if (!acertos.includes(nomeNormalizado)) acertos.push(nomeNormalizado);

      document.getElementById("feedback").textContent = "🎉 Acertou!";
      const pos = estados.indexOf(estadoAtual);
      if (pos !== -1) estados.splice(pos, 1);

      atualizarAcertosVisuais();

      setTimeout(escolherEstado, 500);
    } else {
      path.classList.add("errou");
      document.getElementById("feedback").textContent = "❌ Tente novamente!";
      setTimeout(() => path.classList.remove("errou"), 1000);
    }
  });
});

window.onload = escolherEstado;

