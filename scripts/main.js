// Most of the stuff here is ported from my SEG3125 Lab(s)

// Date control
const today = new Date().toISOString().split('T')[0];
document.getElementById('s_start').min = today;
document.getElementById('s_end').min = today;

// Navigation control
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('d-none');
  });
  
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove('d-none');
  }
}

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1); 
  if (hash) {
    showSection(hash);
  }
});

window.addEventListener('load', () => {
  const hash = window.location.hash.slice(1);
  if (hash) {
    showSection(hash);
  } else {
    showSection('sec-search');
  }
});

// Toast utility
function showToast(message, type = 'success') {
  const toastEl = document.getElementById('appToast');
  const toastBody = document.getElementById('toastBody');
  const toastTitle = document.getElementById('toastTitle');
  toastEl.className = 'toast';
  toastEl.classList.add(type === 'error' ? 'bg-danger' : type === 'warning' ? 'bg-warning' : 'bg-success');
  toastEl.classList.add('text-white');
  toastTitle.textContent = type === 'error' ? 'Error' : type === 'warning' ? 'Warning' : 'Success';
  toastBody.textContent = message;
  const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
  toast.show();
}

// Rendering views
// Maybe needs an async function to load stuff? idk lmao

