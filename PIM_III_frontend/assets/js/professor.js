let selectedDiff = 'easy';
let correctAnswerIdx = -1;

function selectDiff(d) {
  selectedDiff = d;
  ['easy','medium','hard'].forEach(x => {
    const el = document.getElementById('diff-'+x);
    if (el) el.className = 'diff-opt' + (x===d ? ' selected-'+x : '');
  });
}

function setCorrect(idx) {
  correctAnswerIdx = idx;
  for (let i=0; i<5; i++) {
    const r = document.getElementById('radio-'+i);
    if (r) r.className = 'answer-option-radio' + (i===idx ? ' correct-answer' : '');
  }
}

function saveQuestion() {
  const text = document.getElementById('new-q-text').value.trim();
  if (!text) { showToast('⚠️ Preencha o enunciado da questão!'); return; }
  if (correctAnswerIdx < 0) { showToast('⚠️ Marque a alternativa correta!'); return; }

  const tbody = document.getElementById('prof-questions-tbody');
  const diffLabels = { easy:'Fácil', medium:'Médio', hard:'Difícil' };
  const row = document.createElement('tr');
  row.innerHTML = `<td>${text.substring(0,55)}...?</td><td><span class="diff-badge ${selectedDiff}">${diffLabels[selectedDiff]}</span></td><td><button class="action-btn">✏️</button><button class="action-btn">🗑️</button></td>`;
  tbody.insertBefore(row, tbody.firstChild);

  document.getElementById('new-q-text').value = '';
  document.getElementById('new-q-explanation').value = '';
  correctAnswerIdx = -1;
  for (let i=0; i<5; i++) {
    const r = document.getElementById('radio-'+i);
    if (r) r.className = 'answer-option-radio';
  }
  document.querySelectorAll('.answer-option-input').forEach(el => el.value='');

  showToast('✅ Questão salva com sucesso!');
  setTimeout(() => window.location.href = 'painel.html', 1200);
}