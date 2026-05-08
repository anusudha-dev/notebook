const content = document.querySelector('.content');
const content1 = document.querySelector('.content1');
const primarybutton= document.querySelector('.btn-primary');
const secondarybutton= document.querySelector('.btn-secondary');
const buttons = document.querySelector('.buttons');


secondarybutton.addEventListener('click',(e)=>{
    content.style.display = 'none';
    content1.style.display = 'block';
    buttons.style.display = 'none';
    e.target.classList.add('active');
    primarybutton.classList.remove('active');
}

);
primarybutton.addEventListener('click',(e)=>{
    content.style.display = 'block';
    content1.style.display = 'none';
    buttons.style.display = 'block';
    e.target.classList.add('active');
    secondarybutton.classList.remove('active');
}
);
