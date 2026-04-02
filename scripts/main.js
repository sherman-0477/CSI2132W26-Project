// Most of the stuff here is ported from my SEG3125 Lab(s)
const API = 'http://localhost:3000/api';
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

// Dropdown population
async function populateDropdowns() {
  try {
    const [cities, chains] = await Promise.all([
      fetch(`${API}/cities`).then(res => res.json()),
      fetch(`${API}/chains/list`).then(res => res.json()),
    ]);
    const areaSelect = document.getElementById('s_area');
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      areaSelect.appendChild(option);
    });
    const chainSelect = document.getElementById('s_chain');
    chains.forEach(chain => {
      const option = document.createElement('option');
      option.value = chain.chainID;
      option.textContent = chain.chainName;
      chainSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching dropdown data:', error);
    showToast('Failed to load dropdown data', 'error');
  }
}

// Rendering views
async function loadViews() {
  await Promise.all([
    loadAvailableRoomsView(),
    loadCapacityView()
  ]);
}

async function loadAvailableRoomsView() {
  const container = document.getElementById('viewRoomsPerCity');
  try {
    const data = await fetch(`${API}/views/available-rooms`).then(r => r.json());
    if (!data.length) { container.innerHTML = '<p class="p-3 text-muted">No data available.</p>'; return; }
    container.innerHTML = `
      <table class="table table-sm table-striped table-hover mb-0">
        <thead class="table-dark"><tr><th>City</th><th class="text-end">Available Rooms</th></tr></thead>
        <tbody>
          ${data.map(row => `
            <tr>
              <td>${row.city || '—'}</td>
              <td class="text-end fw-bold">${row.totalRooms}</td>
            </tr>`).join('')}
        </tbody>
      </table>`;
  } catch (e) {
    container.innerHTML = `<p class="p-3 text-danger">Error: ${e.message}</p>`;
  }
}

async function loadCapacityView() {
  const container = document.getElementById('viewCapacityPerHotel');
  try {
    const data = await fetch(`${API}/views/capacity-per-hotel`).then(r => r.json());
    if (!data.length) { container.innerHTML = '<p class="p-3 text-muted">No data available.</p>'; return; }
    container.innerHTML = `
      <table class="table table-sm table-striped table-hover mb-0">
        <thead class="table-dark"><tr><th>Hotel</th><th>City</th><th class="text-end">Total Capacity</th></tr></thead>
        <tbody>
          ${data.map(row => `
            <tr>
              <td>${row.hotelName || `Hotel #${row.hotelID}`}</td>
              <td>${row.hotelAddress || '—'}</td>
              <td class="text-end fw-bold">${row.totalCapacity ?? 0}</td>
            </tr>`).join('')}
        </tbody>
      </table>`;
  } catch (e) {
    container.innerHTML = `<p class="p-3 text-danger">Error: ${e.message}</p>`;
  }
}

// Formatting helpers
function stars(n) {
  if (!n) return '—';
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}
function formatMoney(val) {
  if (val == null) return '—';
  return `$${val.toFixed(2)}`;}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString();}

function clearSearchResults() {
  ['s_start','s_end','s_capacity','s_area','s_chain','s_category','s_price','s_rooms'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.value = '';
});
  document.getElementById('searchResults').innerHTML = '';
  document.getElementById('searchCount').textContent = '';
}