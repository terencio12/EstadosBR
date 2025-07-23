

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

const siglasPorEstado = {
  "Acre": "AC",
  "Alagoas": "AL",
  "Amapá": "AP",
  "Amazonas": "AM",
  "Bahia": "BA",
  "Ceará": "CE",
  "Distrito Federal": "DF",
  "Espírito Santo": "ES",
  "Goiás": "GO",
  "Maranhão": "MA",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
  "Minas Gerais": "MG",
  "Pará": "PA",
  "Paraíba": "PB",
  "Paraná": "PR",
  "Pernambuco": "PE",
  "Piauí": "PI",
  "Rio de Janeiro": "RJ",
  "Rio Grande do Norte": "RN",
  "Rio Grande do Sul": "RS",
  "Rondônia": "RO",
  "Roraima": "RR",
  "Santa Catarina": "SC",
  "São Paulo": "SP",
  "Sergipe": "SE",
  "Tocantins": "TO"
};


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
let musicaVitoria; // será usado para controlar o áudio da vitória
let pontuacao = 0;
let tempoInicio = 0;
let tempoResposta = 0;
let tempoTotal = 0;
let cronometroTotalInterval = null;
let estadoAtual = "";
const acertos = [];
let nomeJogador = "";
const container = document.getElementById('confetti-container');
let confeteIntervaloId = null;



document.querySelectorAll('.legenda-regiao').forEach(legenda => {
  const regiao = Array.from(legenda.classList).find(cl => cl !== "legenda-regiao");
  const variavelCor = `--cor-${regiao}`;

  legenda.addEventListener("mouseenter", () => {
    const cor = getComputedStyle(document.documentElement).getPropertyValue(variavelCor).trim();

    legenda.classList.add("hover-ativo"); // destaca a legenda

    document.querySelectorAll(`#mapa a.${regiao} path`).forEach(el => {
      el.dataset.originalFill = el.style.fill;
      el.style.fill = cor;
      el.style.transition = "all 0.3s ease";
    });
  });

  legenda.addEventListener("mouseleave", () => {
    legenda.classList.remove("hover-ativo");

    document.querySelectorAll(`#mapa a.${regiao} path`).forEach(el => {
      el.style.fill = el.dataset.originalFill || "";
    });
  });
});

function iniciarFestaDeComemoracao() {
  // Mostra a mensagem com nome do jogador
  document.getElementById("msgFim").textContent =
    `🏆 Parabéns, ${nomeJogador.toUpperCase()}! Você conquistou todos os estados! 🎉`;

  // Exibe o botão de reinício e mensagem final
  document.getElementById("divTop").style.display = "flex";

  // Remove nome do canto superior e legendas
  document.getElementById("legendasContainer").style.display = "none";

  // Ativa confetes 🎊
  lancaConfetesFixos();
   // Criar vários confetes continuamente
    confeteIntervaloId = setInterval(lancaConfetesFixos, 100);
    

  // Toca música de comemoração 🎶
musicaVitoria = new Audio("sons/vitoria.mp3");
musicaVitoria.volume = 1;
musicaVitoria.play();


}

function lancaConfetesFixos() {
 const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      
      // Cores aleatórias
      const colors = ['#f94144', '#f3722c', '#f9c74f', '#90be6d', '#577590', '#43aa8b', '#f94144', '#f3722c', '#f9c74f', '#90be6d', '#577590', '#43aa8b',
  '#ff0055', '#00eaff', '#39ff14', '#ffae00', '#c300ff',
  '#ff4ecd', '#00ffcc', '#ffd300', '#ff6f00', '#0099ff'];
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      // Posição horizontal aleatória
      confetti.style.left = `${Math.random() * 100}vw`;

      // Tamanho aleatório
      const size = Math.random() * 8 + 4;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;

      // Duração e delay da animação
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.animationDelay = `${Math.random()}s`;

      container.appendChild(confetti);

      // Remover após a animação
      let chuva = setTimeout(() => confetti.remove(), 5000);
 }








  function escolherEstado() {
  if (estados.length === 0) {
    clearInterval(cronometroTotalInterval);
    if (musicStarted && typeof musicStarted.pause === "function") {
      musicStarted.pause();
    }

   

  const bonus = 11; // <-- bonus pra completar200
  pontuacao += bonus;

   document.getElementById("pontuacao").textContent = `Pontos: ${pontuacao}`;


    //document.getElementById("cronometroTotal").textContent = `⏳ Tempo total: ${tempoFinal}s`;
   

    //document.getElementById("estadoAtual").textContent = "Concluído!";
    document.getElementById("legendasContainer").style.display = "none";
    document.getElementById("nomeExibido").style.display = "none";
    document.getElementById("estadoAtualContainer").style.display = "none";
    document.getElementById("bolinha").style.display = "none";

if (pontuacao >= 200) {
  iniciarFestaDeComemoracao(); // 🎉 aqui vem a magia
}

    document.getElementById("msgFim").textContent = "👏 PARABÉNS " + nomeJogador.toUpperCase() + " Você acertou todos os estados!";
    document.getElementById("divTop").style.display = "inline-block";
    document.getElementById("btnReiniciar").style.display = "inline-block";
    return;
  }

  tempoInicio = Date.now();
  estadoAtual = estados[Math.floor(Math.random() * estados.length)];

  const regiao = regioesPorEstado[estadoAtual]; // ✅ pega a região correta
  atualizarEstadoAtual(estadoAtual, regiao);

  document.getElementById("estadoAtual").textContent = estadoAtual;
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

function mostrarFeedback(mensagem) {
  const feedbackEl = document.getElementById("feedbackContainer");
  feedbackEl.textContent = mensagem;

  if (mensagem.includes("✅")) {
    feedbackEl.style.backgroundColor = "#ffffffff";
    feedbackEl.classList.add("fundo-acertou");
    feedbackEl.classList.remove("fundo-errou");
  } else {
    feedbackEl.style.backgroundColor = "#ffffffff";
    feedbackEl.classList.add("fundo-errou");
    feedbackEl.classList.remove("fundo-acertou");
  }

  feedbackEl.style.display = "block";

  setTimeout(() => {
    feedbackEl.style.display = "none";
    feedbackEl.classList.remove("fundo-acertou", "fundo-errou");
  }, 500);
}

// 🧠 Aplica o evento apenas uma vez por link
document.querySelectorAll("#mapa a").forEach(function (link) {
  const path = link.querySelector("path");
  if (!path) return;

  link.addEventListener("click", function (e) {
    if (acertos.includes(normalizar(link.dataset.title || ""))) {
  return; // se já foi acertado, ignora
}
    e.preventDefault();
    if (path.classList.contains(""));

    const nomeEstado = link.dataset.title?.trim() || "desconhecido";
    const nomeNormalizado = normalizar(nomeEstado);
    const estadoNormalizado = normalizar(estadoAtual).replace(/\s/g, '');

    if (nomeNormalizado === estadoNormalizado) {
      tempoResposta = Date.now() - tempoInicio; // em milissegundos


let segundos = tempoResposta / 1000;
let pontosRapidez = 0;

if (segundos <= 4) {
  pontosRapidez = 5;
} else if (segundos <= 4.5) {
  pontosRapidez = 4;
} else if (segundos <= 5) {
  pontosRapidez = 3;
} else if (segundos <= 5.5) {
  pontosRapidez = 2;
} else if (segundos <= 6) {
  pontosRapidez = 1;
} else {
  pontosRapidez = 0;
}

let pontosAcerto = 2;

// 🧮 Soma total: máx 100
let pontosRodada = pontosAcerto + pontosRapidez;
pontuacao += pontosRodada;

document.getElementById("pontuacao").textContent = `Pontos: ${pontuacao}`;
      if (!acertos.includes(nomeNormalizado)) acertos.push(nomeNormalizado);
      mostrarFeedback("✅ Acertou!");
      const pos = estados.indexOf(estadoAtual);
      if (pos !== -1) estados.splice(pos, 1);

      atualizarAcertosVisuais();

      setTimeout(escolherEstado, 500);
    
    } else {
      //pontuacao -= 1; // ou qualquer valor que queira para cada acerto
      if(pontuacao < 0) {pontuacao = 0}
document.getElementById("pontuacao").textContent = `Pontos: ${pontuacao}`;
      path.classList.add("errou");

   mostrarFeedback("❌ Errou!");

      setTimeout(() => path.classList.remove("errou"), 500);
     
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
  tempoTotal = Date.now();
  clearInterval(cronometroTotalInterval);

  cronometroTotalInterval = setInterval(() => {
    const agora = Date.now();
    const tempoDecorrido = agora - tempoTotal;

    const minutos     = Math.floor(tempoDecorrido / 60000);
    const segundos    = Math.floor((tempoDecorrido % 60000) / 1000);
    const centesimos  = Math.floor((tempoDecorrido % 1000) / 10);
    const segStr = String(segundos).padStart(2, "0");
    const centStr = String(centesimos).padStart(2, "0");

    const tempoFormatado = `${minutos}:${segundos}.${centesimos}`;
    

    // Atualiza no campo de texto do círculo
    document.querySelector(".tempoTexto").textContent =
  `${minutos}:${segStr}.${centStr}`;

    // Se quiser também manter no cronômetro digital original:
    //document.getElementById("cronometroTotal").textContent = `⏳ Tempo total: ${tempoFormatado}`;
  }, 50);
}


function getName() {
  return document.getElementById("nomeJogador").value.trim();
}

function iniciarJogo(nome) {
 nomeJogador = getName();

  if (nomeJogador === "") {
    alert("Por favor, digite seu nome antes de começar o jogo.");
    return;
  }

  document.getElementById("nomeExibido").textContent = `👤 ${nomeJogador.toUpperCase()}`;
  document.getElementById("telaInicio").style.display = "none";
  document.getElementById("telaJogo").style.display = "block";

  startMusic();
  contaTempo();
  escolherEstado();
}



    function reiniciarJogo() {

      document.getElementById("divTop").style.display = "none";
      document.getElementById("legendasContainer").style.display = "block";
      document.getElementById("nomeExibido").style.display = "block";
       document.getElementById("estadoAtualContainer").style.display = "block";
       document.getElementById("bolinha").style.display = "block";
       pararMusicas();
       
if (confeteIntervaloId) {
    clearInterval(confeteIntervaloId);
    confeteIntervaloId = null;
  }

if (musicStarted) {
  musicStarted.currentTime = 0;
  musicStarted.volume = 1;
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

function pararMusicas() {
  const audios = [musicStarted, musicaVitoria]; // adicione outros se houver

  audios.forEach(audio => {
    if (audio && typeof audio.pause === "function") {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

function prepararConfetesFixos() {
  const container = document.getElementById("chuvaConfetes");
  for (let i = 0; i < 100; i++) {
    const confete = document.createElement("div");
    confete.classList.add("confete");
    confete.style.left = Math.random() * window.innerWidth + "px";
    confete.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    container.appendChild(confete);
  }
}










