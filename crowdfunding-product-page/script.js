const BackProjectsBtn = document.getElementById('back-project-btn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');
const overlay = document.getElementById('overlay');

BackProjectsBtn.addEventListener('click', function (){
    modal.classList.add('active');
    overlay.classList.add('active');
    document.querySelector('main').classList.add('inactive');
});


closeModalBtn.addEventListener('click', function() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('main').classList.remove('inactive');
});