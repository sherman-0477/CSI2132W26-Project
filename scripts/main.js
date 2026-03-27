// Most of the stuff here is ported from my SEG3125 Lab(s)
// Thing for dates (user can't select past dates for search)
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
