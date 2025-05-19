const PHOTOS_API = '/server/get-photos.php';
const ADMIN_PASSWORD = "popcorn123"; // Change this for production!

document.addEventListener('DOMContentLoaded', () => {
  // Admin login
  document.getElementById('adminLoginBtn').addEventListener('click', () => {
    const password = prompt("Enter admin password:");
    if(password === ADMIN_PASSWORD) {
      window.location.href = "gallery-admin.html";
    } else {
      alert("Incorrect password");
    }
  });

  // Load and display photos
  loadPhotos();

  // Search functionality
  document.getElementById('searchBtn').addEventListener('click', searchPhotos);
});

async function loadPhotos() {
  try {
    const response = await fetch(PHOTOS_API);
    const photos = await response.json();
    displayPhotos(photos);
  } catch (error) {
    console.error("Error loading photos:", error);
  }
}

function displayPhotos(photos) {
  const grid = document.getElementById('photoGrid');
  grid.innerHTML = '';

  photos.forEach(photo => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.innerHTML = `
      <img src="assets/uploads/${photo.filename}" loading="lazy">
      <div class="photo-tags"><i class="fas fa-users"></i> ${photo.tags.join(', ')}</div>
    `;
    grid.appendChild(card);
  });
}

function searchPhotos() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.photo-card');
  
  cards.forEach(card => {
    const tags = card.querySelector('.photo-tags').textContent.toLowerCase();
    card.style.display = term === '' || tags.includes(term) ? 'block' : 'none';
  });
}