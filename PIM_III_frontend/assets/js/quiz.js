const questions = [
  {
    id: 1,
    text: `Um analista foi contratado para desenvolver um sistema de pesquisa de DVDs em lojas virtuais. O sistema deverá solicitar ao usuário um título de DVD, que será usado para realizar a pesquisa nas bases de dados das lojas conveniadas.\n\nCom relação ao modelo de ciclo de vida, qual afirmativa está CORRETA?`,
    options: [
      "A execução sequencial das fases sem retorno produz um sistema que pode ser validado pelo contratante em qualquer etapa.",
      "A elaboração do protótipo pode aumentar riscos de inclusão de funcionalidades não prioritárias.",
      "A definição das restrições deve ser a segunda fase a ser realizada no projeto, na etapa de engenharia.",
      "Um processo iterativo permite versões progressivas mais completas do sistema."
    ],
    correct: [1, 3],
    multipleCorrect: true,
    explanation: "O protótipo facilita a resolução de dúvidas mas abre espaço para novas funcionalidades (II correto). O processo iterativo permite versões incrementais e progressivamente mais completas (IV correto).",
    level: 'easy'
  },
  {
    id: 2,
    text: `Uma pizzaria ampliou suas instalações e contratou uma empresa para melhorar o sistema informatizado. No desenvolvimento, a empresa aproveitou partes do sistema antigo e estendeu os componentes, reaproveitando código já validado e acrescentando novas funções.\n\nQual conceito de orientação a objetos está descrito?`,
    options: ["Sobrecarga","Herança","Sobreposição","Abstração"],
    correct: [1],
    multipleCorrect: false,
    explanation: "A herança aproveita tudo que foi desenvolvido e aprovado na superclasse, possibilitando o uso nas subclasses como código já testado e validado.",
    level: 'easy'
  },
  {
    id: 3,
    text: `O Rational Unified Process (RUP) é um processo de engenharia de software iterativo e incremental. Com base na iteração do RUP, analise as asserções:\n\nI. A cada iteração das fases do RUP, geram-se ou não artefatos de software.\nPORQUE\nII. Os artefatos produzidos dependem da ênfase que é dada a cada disciplina.\n\nAssinale a opção correta:`,
    options: [
      "As duas asserções são verdadeiras, e a segunda justifica a primeira.",
      "As duas asserções são verdadeiras, e a segunda NÃO justifica a primeira.",
      "A primeira asserção é verdadeira e a segunda é falsa.",
      "A primeira asserção é falsa e a segunda é verdadeira."
    ],
    correct: [3],
    multipleCorrect: false,
    explanation: "A asserção I é FALSA: a cada iteração, geram-se vários artefatos obrigatoriamente. A asserção II é VERDADEIRA: cada artefato é escolhido em função da ênfase/peso de cada disciplina.",
    level: 'easy'
  },
  {
    id: 4,
    text: `Os alunos deveriam escolher um sistema para modelagem. Um grupo estabeleceu a seguinte estratégia: criaram nicknames em um chat, reuniram-se online, cada integrante sugeriu sistemas sem criticar os outros, o líder copiava as ideias para um editor de texto e, ao final, as 5 melhores ideias foram colocadas em votação.\n\nEsta estratégia é uma adaptação de qual técnica de levantamento de requisitos?`,
    options: ["JAD (Joint Application Design)","PIECES","FAST (Facilitated Application Specification Technique)","Entrevista","Brainstorming"],
    correct: [4],
    multipleCorrect: false,
    explanation: "A técnica é Brainstorming: proibição de críticas, documentação posterior, votação das melhores ideias.",
    level: 'easy'
  },
  {
    id: 5,
    text: `Uma indústria de alimentos tem um sistema para classificar sementes por cor e um mecanismo robótico para separação em lotes. O mecanismo foi substituído com sucesso por um equipamento de outra marca.\n\nAnalise as afirmativas sobre fatores de qualidade:\nI. As operações de classificação e separação não podem falhar — o atributo correspondente é a interoperabilidade.\nII. A fácil substituição do robô por outra marca indica que o sistema é portável.\nIII. A interface gráfica do controle robótico deve contemplar ergonomia — fator de usabilidade.\n\nQuantas afirmativas estão corretas?`,
    options: [
      "Apenas a afirmativa III está correta.",
      "Apenas as afirmativas I e II estão corretas.",
      "Apenas as afirmativas I e III estão corretas.",
      "Apenas as afirmativas II e III estão corretas.",
      "Todas as afirmativas estão corretas."
    ],
    correct: [0],
    multipleCorrect: false,
    explanation: "I errada: confiabilidade (não interoperabilidade). II errada: substituição de marca é interoperabilidade (não portabilidade). III correta: ergonomia → usabilidade.",
    level: 'easy'
  }
];

let currentQuestion = 0;
let selectedOptions = {};
let answeredQuestions = {};
let currentLevel = 'easy';

function loadQuizState() {
  const saved = sessionStorage.getItem('quizState');
  if (saved) {
    const state = JSON.parse(saved);
    currentQuestion = state.currentQuestion || 0;
    selectedOptions = state.selectedOptions || {};
    answeredQuestions = state.answeredQuestions || {};
    currentLevel = state.currentLevel || 'easy';
  }
}

function saveQuizState() {
  sessionStorage.setItem('quizState', JSON.stringify({
    currentQuestion,
    selectedOptions,
    answeredQuestions,
    currentLevel
  }));
}

function startLevel(level) {
  currentLevel = level;
  currentQuestion = 0;
  selectedOptions = {};
  answeredQuestions = {};
  const badges = { easy: 'Nível Fácil', medium: 'Nível Médio', hard: 'Nível Difícil' };
  const badge = document.getElementById('level-badge-display');
  if (badge) {
    badge.textContent = badges[level];
    badge.className = 'level-badge ' + level;
  }
  saveQuizState();
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];
  if (!q) return;
  document.getElementById('q-current').textContent = currentQuestion + 1;
  document.getElementById('q-total').textContent = questions.length;
  document.getElementById('q-text').innerHTML = q.text.replace(/\n/g, '<br>');

  const optContainer = document.getElementById('q-options');
  optContainer.innerHTML = '';
  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    const isAnswered = answeredQuestions[currentQuestion] !== undefined;
    const isSelected = selectedOptions[currentQuestion] !== undefined &&
      (Array.isArray(selectedOptions[currentQuestion])
        ? selectedOptions[currentQuestion].includes(i)
        : selectedOptions[currentQuestion] === i);
    const isCorrect = q.correct.includes(i);

    let cls = 'option-item';
    if (isAnswered) {
      if (isCorrect) cls += ' correct';
      else if (isSelected && !isCorrect) cls += ' wrong';
    } else if (isSelected) {
      cls += ' selected';
    }

    div.className = cls;
    div.innerHTML = `<div class="option-radio ${isSelected ? 'filled' : ''}"></div><span class="option-text">${opt}</span>`;
    if (!isAnswered) div.onclick = () => selectOption(i);
    optContainer.appendChild(div);
  });

  const fb = document.getElementById('feedback-box');
  if (fb) {
    if (answeredQuestions[currentQuestion] !== undefined) {
      fb.className = 'feedback-box show ' + (answeredQuestions[currentQuestion] ? 'correct' : 'wrong');
      fb.innerHTML = (answeredQuestions[currentQuestion] ? '<strong>✅ Correto!</strong><br>' : '<strong>❌ Incorreto!</strong><br>') + q.explanation;
    } else {
      fb.className = 'feedback-box';
      fb.innerHTML = '';
    }
  }
}

function selectOption(idx) {
  const q = questions[currentQuestion];
  if (answeredQuestions[currentQuestion] !== undefined) return;
  selectedOptions[currentQuestion] = idx;
  answeredQuestions[currentQuestion] = q.correct.includes(idx);
  saveQuizState();
  renderQuestion();
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) { 
    currentQuestion++; 
    saveQuizState();
    renderQuestion(); 
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) { 
    currentQuestion--; 
    saveQuizState();
    renderQuestion(); 
  }
}

function discardTwo() {
  const q = questions[currentQuestion];
  if (answeredQuestions[currentQuestion] !== undefined) return;
  const wrongOpts = q.options.map((_,i)=>i).filter(i=>!q.correct.includes(i));
  const toRemove = wrongOpts.sort(()=>Math.random()-0.5).slice(0,2);
  const items = document.querySelectorAll('.option-item');
  toRemove.forEach(i => {
    if (items[i]) {
      items[i].style.opacity = '0.3';
      items[i].style.pointerEvents = 'none';
      items[i].style.textDecoration = 'line-through';
    }
  });
}

function skipQuestion() { 
  answeredQuestions[currentQuestion] = false; 
  saveQuizState();
  nextQuestion(); 
}

function showResult() {
  const total = questions.length;
  const correct = Object.values(answeredQuestions).filter(v=>v===true).length;
  const pct = Math.round((correct/total)*100);
  document.getElementById('result-score').textContent = correct + '/' + total;
  document.getElementById('result-sub').textContent = `Você acertou ${pct}% das questões!`;
  if (pct >= 80) { 
    document.getElementById('result-icon').textContent = '🎉'; 
    document.getElementById('result-title').textContent = 'Excelente resultado!'; 
  }
  else if (pct >= 60) { 
    document.getElementById('result-icon').textContent = '👍'; 
    document.getElementById('result-title').textContent = 'Bom trabalho!'; 
  }
  else { 
    document.getElementById('result-icon').textContent = '📚'; 
    document.getElementById('result-title').textContent = 'Continue praticando!'; 
  }
  document.getElementById('screen-result').classList.add('active');
  document.getElementById('screen-quiz').classList.remove('active');
}

function restartQuiz() { 
  startLevel(currentLevel); 
}