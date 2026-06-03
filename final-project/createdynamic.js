const menuBtn = document.querySelector(".sandwhichicon");

const mobileMenu = document.querySelector(".mobile-menu");

const closeBtn = document.querySelector(".close-menu");

const mobilecreatebtn = document.querySelector(".notesss");

mobilecreatebtn.addEventListener("click", () => {
  window.location.href = "createdynamic.html";
});

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});

const logintoken = localStorage.getItem("token1");
const noteId = localStorage.getItem("noteId");
let text = document.getElementById("text");
let content = document.getElementById("content");
let logout = document.getElementsByClassName("log-out")[0];
let pagetitle = document.getElementById("pagetitle");
let pagedescription = document.getElementById("pagedescription");
let backtohome = document.getElementById("identificationpartbth");

backtohome.addEventListener("click", () => {
  window.location.href = "createnotehomepage.html";
});

const createnoteupperbtn = document.querySelector(".headerbutton");
createnoteupperbtn.addEventListener("click", () => {
  localStorage.removeItem("noteId");
  window.location.href = "createdynamic.html";
});

if (noteId) {
  pagetitle.textContent = "Edit note";
  pagedescription.textContent = "Update your note and save when you are done.";
}

if (!logintoken) {
  window.location.replace(" index.html");
}

logout.addEventListener("click", () => {
  localStorage.removeItem("token1");

  window.location.replace("signup.html");
});

let savecreatebtn = document.getElementsByClassName("savecreate")[0];

let cancelbtn = document.getElementsByClassName("cancel")[0];

let mainproperty = document.getElementsByClassName("mainproperty")[0];
console.log(logintoken);

savecreatebtn.addEventListener("click", createFetchApi);

cancelbtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("text").value = "";
  document.getElementById("content").value = "";
  window.location.href = "createnotehomepage.html";
});

function createFetchApi(e) {
  e.preventDefault();
  let text = document.getElementById("text").value;
  console.log(text);
  let content = document.getElementById("content").value;
  console.log(content);

  const noteData = {
    title: text,

    content: content,
    updated_at: new Date().toISOString(),
  };

  if (noteId) {
    fetch(
      `https://ekwvioyykteghvotgimj.supabase.co/rest/v1/notes?id=eq.${noteId}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${logintoken}`,

          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrd3Zpb3l5a3RlZ2h2b3RnaW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTE3NzgsImV4cCI6MjA5NDIyNzc3OH0.CYSDUnRWBmumDp9tl17XrsstX8bS9ogEIXXZOwsBFN8",

          Prefer: "return=representation",
        },

        body: JSON.stringify(noteData),
      },
    )
      .then((response) => response.json())

      .then((data) => {
        console.log("UPDATED NOTE");

        console.log(data);

        Toastify({
          text: "Note updated successfully",
          duration: 3000,
          gravity: "top",
          position: "center",
          style: {
            background: "#071b1b",
            color: "#7CFFB2",
            border: "1px solid #00ff99",
            borderRadius: "12px",
          },
        }).showToast();

        // remove old note id
        localStorage.removeItem("noteId");

        // go homepage
        setTimeout(() => {
          window.location.href = "createnotehomepage.html";
        }, 1000);
      })

      .catch((error) => console.log(error));
  } else {
    fetch("https://ekwvioyykteghvotgimj.supabase.co/rest/v1/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logintoken}`,
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrd3Zpb3l5a3RlZ2h2b3RnaW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTE3NzgsImV4cCI6MjA5NDIyNzc3OH0.CYSDUnRWBmumDp9tl17XrsstX8bS9ogEIXXZOwsBFN8",
        Prefer: "return=representation",
      },
      body: JSON.stringify(noteData),
    })
      .then((response) => response.json())
      .then((data) => {
        Toastify({
          text: "Note saved successfully",
          duration: 3000,
          gravity: "top",
          position: "center",
          style: {
            background: "#071b1b",
            color: "#7CFFB2",
            border: "1px solid #00ff99",
            borderRadius: "12px",
          },
        }).showToast();

        setTimeout(() => {
          window.location.href = "createnotehomepage.html";
        }, 1000);
        console.log(data);
        displayNotes(data);
      })
      .catch((error) => console.log(error));
  }
}

if (noteId) {
  fetch(
    `https://ekwvioyykteghvotgimj.supabase.co/rest/v1/notes?id=eq.${noteId}&select=*`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${logintoken}`,
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrd3Zpb3l5a3RlZ2h2b3RnaW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTE3NzgsImV4cCI6MjA5NDIyNzc3OH0.CYSDUnRWBmumDp9tl17XrsstX8bS9ogEIXXZOwsBFN8",
      },
    },
  )
    .then((res) => res.json())

    .then((data) => {
      console.log(data);

      const note = data[0];

      text.value = note.title;

      content.value = note.content;
    })

    .catch((err) => console.log(err));
}
