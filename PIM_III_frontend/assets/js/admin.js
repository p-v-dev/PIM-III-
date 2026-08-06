function showAdminSection(name, btn) {
  document.querySelectorAll('.admin-section').forEach(s=>s.classList.remove('active'));
  const el = document.getElementById('admin-section-'+name);
  if (el) el.classList.add('active');
  document.querySelectorAll('.sidebar-item').forEach(b=>b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function addUser() {
  const name  = document.getElementById('new-user-name').value.trim();
  const email = document.getElementById('new-user-email').value.trim();
  const role  = document.getElementById('new-user-role').value;
  const pw    = document.getElementById('new-user-pw').value;

  if (!name||!email||!pw) { showToast('⚠️ Preencha todos os campos!'); return; }

  const tbody = document.getElementById('users-tbody');
  const row = document.createElement('tr');
  const today = new Date().toLocaleDateString('pt-BR');
  row.innerHTML = `<td>${name}</td><td>${email}</td><td><span class="role-tag ${role}">${role.charAt(0).toUpperCase()+role.slice(1)}</span></td><td><span class="status-badge active">Ativo</span></td><td>${today}</td><td><button class="admin-action-btn">✏️ Editar</button><button class="admin-action-btn danger" onclick="toggleUserStatus(this)">🔒 Desativar</button></td>`;
  tbody.insertBefore(row, tbody.firstChild);

  document.getElementById('new-user-name').value='';
  document.getElementById('new-user-email').value='';
  document.getElementById('new-user-pw').value='';
  closeModal('modal-add-user');
  showToast('✅ Usuário criado com sucesso!');
}

function toggleUserStatus(btn) {
  const row = btn.closest('tr');
  const badge = row.querySelector('.status-badge');
  const isActive = badge.classList.contains('active');
  if (isActive) {
    badge.className = 'status-badge inactive';
    badge.textContent = 'Inativo';
    btn.textContent = '🔓 Ativar';
    btn.style.color = 'var(--green)';
    btn.classList.remove('danger');
    showToast('🔒 Conta desativada (Soft Delete)');
  } else {
    badge.className = 'status-badge active';
    badge.textContent = 'Ativo';
    btn.textContent = '🔒 Desativar';
    btn.style.color = '';
    btn.classList.add('danger');
    showToast('🔓 Conta reativada com sucesso!');
  }
}

function filterUsers() {
  const q = document.getElementById('user-search').value.toLowerCase();
  document.querySelectorAll('#users-tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}