const form=document.querySelector('form');
const email=document.querySelector('#emailaddress');
const password=document.querySelector('#password');

function showError(input,message){
    const formElement=input.parentElement;
    const p=formElement.querySelector('p');
    const inputField=formElement.querySelector('input');
    inputField.style.borderColor='red';
    p.innerText=message;
    p.style.display='block';
    p.style.color='red';
}

function showSuccess(input){
    const formElement=input.parentElement;
    const p=formElement.querySelector('p');
    const inputField=formElement.querySelector('input');
    inputField.style.borderColor='green';
    p.style.display='none';
   
}

function getFieldName(input){
    return input.id;
}
function checkLength(input,min){
    if(input.value.length===0){
        showError(input,`${getFieldName(input)} is required`);
    }
    else if(input.value.length<min){
        showError(input,`${getFieldName(input)} must be at least ${min} characters`);
    }
    else{
        showSuccess(input);
    }
}

function checkEmail(input){
    let email=input.value.trim();
    if(email===''){
        showError(input,`${getFieldName(input)} is required`);
    }
    else if(email!==email.toLowerCase()){
        showError(input,`${getFieldName(input)} should be in lowercased`);
    }
    else{
        showSuccess(input);
    }
}



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    checkLength(password,8);
    checkEmail(email);


})