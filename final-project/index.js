const token = localStorage.getItem("token1");

if(token){
    window.location.replace("createnotehomepage.html");
}

let signupbtn = document.getElementsByClassName("clickbtn")[0];

signupbtn.addEventListener("click", () => {
    window.location.href = "signup.html";
});