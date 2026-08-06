function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function openModal(id) { 
  document.getElementById(id).classList.add('open'); 
}

function closeModal(id) { 
  document.getElementById(id).classList.remove('open'); 
}

function toggleDropdown() { 
  document.getElementById('dropdown-overlay').classList.toggle('open'); 
}

function closeDropdown() { 
  document.getElementById('dropdown-overlay').classList.remove('open'); 
}