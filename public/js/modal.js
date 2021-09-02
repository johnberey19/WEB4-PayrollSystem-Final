var modal = document.getElementById('modal');
var btnAdd = document.getElementById('btnAdd');
var btnClose = document.getElementById('btnClose');

btnClose.addEventListener('click', closeModal());
btnAdd.addEventListener('click', openModal());

function openModal(){
    modal.style.display = 'block';
}
function closeModal(){
    modal.style.display = "none";
}