
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

const regioesPorEstado = {
  "Acre": "norte",
  "Amazonas": "norte",
  "Pará": "norte",
  "Rondônia": "norte",
  "Roraima": "norte",
  "Amapá": "norte",
  "Tocantins": "norte",

  "Maranhão": "nordeste",
  "Piauí": "nordeste",
  "Ceará": "nordeste",
  "Rio Grande do Norte": "nordeste",
  "Paraíba": "nordeste",
  "Pernambuco": "nordeste",
  "Alagoas": "nordeste",
  "Sergipe": "nordeste",
  "Bahia": "nordeste",

  "Goiás": "centro-oeste",
  "Mato Grosso": "centro-oeste",
  "Mato Grosso do Sul": "centro-oeste",
  "Distrito Federal": "centro-oeste",

  "São Paulo": "sudeste",
  "Rio de Janeiro": "sudeste",
  "Minas Gerais": "sudeste",
  "Espírito Santo": "sudeste",

  "Paraná": "sul",
  "Santa Catarina": "sul",
  "Rio Grande do Sul": "sul"
};
const musicStarted = document.getElementById("musicaJogo");
let pontuacao = 0;
let tempoInicio = 0;
let tempoResposta = 0;
let tempoTotalInicio = 0;
let cronometroTotalInterval = null;



let estadoAtual = "";
const acertos = [];

  function escolherEstado() {
  if (estados.length === 0) {
    clearInterval(cronometroTotalInterval);
    if (musicStarted && typeof musicStarted.pause === "function") {
      musicStarted.pause();
    }

    const tempoFinal = Math.floor((Date.now() - tempoTotalInicio) / 1000);
    document.getElementById("cronometroTotal").textContent = `⏳ Tempo total: ${tempoFinal}s`;
    //document.getElementById("estadoAtual").textContent = "Concluído!";
    document.getElementById("estadoAtualContainer").style.display = "none";
    document.getElementById("divTop").style.display = "inline-block";
    document.getElementById("feedback").textContent = "🏆 Você acertou todos os estados!";
    document.getElementById("btnReiniciar").style.display = "inline-block";
    return;
  }

  tempoInicio = Date.now();
  estadoAtual = estados[Math.floor(Math.random() * estados.length)];

  const regiao = regioesPorEstado[estadoAtual]; // ✅ pega a região correta
  atualizarEstadoAtual(estadoAtual, regiao);

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
      link.classList.add("acertou");
    } else {
      link.classList.remove("acertou");
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
      tempoResposta = Date.now() - tempoInicio; // em milissegundos


let pontosRapidez = Math.max(0, 3 - Math.floor(tempoResposta / 2000));

let pontosAcerto = 2;

// 🧮 Soma total: máx 100
let pontosRodada = pontosAcerto + pontosRapidez;
pontuacao += pontosRodada;

document.getElementById("pontuacao").textContent = `Pontos: ${pontuacao}`;
      if (!acertos.includes(nomeNormalizado)) acertos.push(nomeNormalizado);

      document.getElementById("feedback").textContent = "🎉 Acertou!";
      const pos = estados.indexOf(estadoAtual);
      if (pos !== -1) estados.splice(pos, 1);

      atualizarAcertosVisuais();

      setTimeout(escolherEstado, 500);
    } else {
      //pontuacao -= 1; // ou qualquer valor que queira para cada acerto
      if(pontuacao < 0) {pontuacao = 0}
document.getElementById("pontuacao").textContent = `Pontos: ${pontuacao}`;
      path.classList.add("errou");
      document.getElementById("feedback").textContent = "❌ Tente novamente!";
      setTimeout(() => path.classList.remove("errou"), 1000);
    }
  });
});

function atualizarEstadoAtual(nomeEstado, regiao) {
  const estadoEl = document.getElementById("estadoAtual");
  const containerEl = document.getElementById("estadoAtualContainer");

  estadoEl.textContent = nomeEstado;

  // Remove classes anteriores
  containerEl.classList.remove("norte", "nordeste", "centro-oeste", "sudeste", "sul");

  // Adiciona a nova classe da região
  containerEl.classList.add(regiao);
}

function contaTempo() {
  tempoTotalInicio = Date.now();
clearInterval(cronometroTotalInterval);
document.getElementById("cronometroTotal").textContent = "⏳ Tempo total: 0s";

cronometroTotalInterval = setInterval(() => {
  const agora = Date.now();
  const tempoDecorrido = agora - tempoTotalInicio;

  const segundos = (tempoDecorrido / 1000).toFixed(2); // mostra até centésimos

  document.getElementById("cronometroTotal").textContent = `⏳ Tempo total: ${segundos}s`;
}, 100);
}

    function iniciarJogo() {
      contaTempo();
      document.getElementById("telaInicio").style.display = "none";
      document.getElementById("telaJogo").style.display = "block";
      startMusic();
      escolherEstado(); 
    }

    function reiniciarJogo() {
      document.getElementById("btnReiniciar").style.display = "none";
if (musicStarted) {
  musicStarted.currentTime = 0;
  musicStarted.play();
}

      contaTempo();
  // Restaura todos os estados
  estados.splice(0, estados.length,
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará",
    "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
    "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará",
    "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
    "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima",
    "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
  );

  // Zera pontuação e lista de acertos
  pontuacao = 0;
  acertos.length = 0;

  // Remove estilos visuais dos paths
document.querySelectorAll("#mapa a").forEach(link => {
  link.classList.remove("acertou", "errou");
  const path = link.querySelector("path");
  if (path) path.classList.remove("errou"); // remove só erro do path
});

  // Atualiza placar e inicia novo estado
  document.getElementById("pontuacao").textContent = "Pontos: 0";
  document.getElementById("feedback").textContent = "";
  escolherEstado();
}

function startMusic() {
  if (musicStarted && typeof musicStarted.play === "function") {
    musicStarted.currentTime = 0;
    musicStarted.volume = 0.4;
    musicStarted.play().catch(() => {
      console.log('Clique para iniciar a música.');
    });
  }
}


