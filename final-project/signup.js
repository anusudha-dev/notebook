
const token = localStorage.getItem("token1");

if(token){
    window.location.replace("createnotehomepage.html");
    /*window.location.href = "createdynamic.html";*/
}

   


const submit = document.getElementById("submit");

submit.addEventListener("click", (event)=>{
    event.preventDefault();
    const firstnamee=document.getElementById("firstname");
    const lastnamee=document.getElementById("lastname");
   
    const emailaddress=document.getElementById("emailaddress").value;
    const password=document.getElementById("password").value;
    const firstname=document.getElementById("firstname").value;
    const lastname=document.getElementById("lastname").value;

    fetch("https://ekwvioyykteghvotgimj.supabase.co/auth/v1/signup",{
    method:"POST",
     headers: {
          "Content-Type": "application/json",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrd3Zpb3l5a3RlZ2h2b3RnaW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTE3NzgsImV4cCI6MjA5NDIyNzc3OH0.CYSDUnRWBmumDp9tl17XrsstX8bS9ogEIXXZOwsBFN8"

     },
    body: JSON.stringify({
        email: emailaddress,
        password: password,
        data: {
            first_name: firstname,
            last_name: lastname
 }

    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
    localStorage.setItem("token1", data.access_token);
    window.location.href="createnotehomepage.html";
    //localStorage.setItem("token", data.access_token);//
})
.catch(error => console.error("Error:", error));
    

});


 