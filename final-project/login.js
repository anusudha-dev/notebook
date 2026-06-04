const form = document.querySelector("form");
const email = document.querySelector("#emailaddress");
const password = document.querySelector("#password");

function showError(input, message) {
  const formElement = input.parentElement;
  const p = formElement.querySelector("p");
  const inputField = formElement.querySelector("input");
  inputField.style.borderColor = "red";
  p.innerText = message;
  p.style.display = "block";
  p.style.color = "red";
}

function showSuccess(input) {
  const formElement = input.parentElement;
  const p = formElement.querySelector("p");
  const inputField = formElement.querySelector("input");
  inputField.style.borderColor = "green";
  p.style.display = "none";
}

function getFieldName(input) {
  return input.id;
}
function checkLength(input, min) {
  if (input.value.length === 0) {
    showError(input, `${getFieldName(input)} is required`);
  } else if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`,
    );
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  let email = input.value.trim();
  if (email === "") {
    showError(input, `${getFieldName(input)} is required`);
  } else if (email !== email.toLowerCase()) {
    showError(input, `${getFieldName(input)} should be in lowercased`);
  } else {
    showSuccess(input);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkLength(password, 8);
  checkEmail(email);
});

form.addEventListener("submit", (e) => {
  fetch(
    "https://ekwvioyykteghvotgimj.supabase.co/auth/v1/token?grant_type=password",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrd3Zpb3l5a3RlZ2h2b3RnaW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTE3NzgsImV4cCI6MjA5NDIyNzc3OH0.CYSDUnRWBmumDp9tl17XrsstX8bS9ogEIXXZOwsBFN8",
      },

      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    },
  )
    .then((response) => response.json())

    .then((data) => {
      console.log(data);

      localStorage.setItem("token1", data.access_token);

      window.location.href = "createnotehomepage.html";
    })

    .catch((error) => console.log(error));
});
