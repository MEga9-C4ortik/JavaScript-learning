const sidenav = document.getElementById('sidenav');
const hamburger = document.querySelector('.hamburger');
const overlay = document.querySelector('.overlay');

function toggleSidenav() {
    sidenav.classList.toggle('open');
    overlay.classList.toggle('active');
}

function showSection() {

}

hamburger.addEventListener('click', toggleSidenav);