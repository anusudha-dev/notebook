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

if (!logintoken) {
  window.location.href = "signup.html";
}

const createnoteupperbtn = document.querySelector(".headerbutton");
createnoteupperbtn.addEventListener("click", () => {
  window.location.href = "createdynamic.html";
});

const createnotebtn = document.querySelector(".notecreation");
createnotebtn.addEventListener("click", () => {
  window.location.href = "createdynamic.html";
});

let emptystate = document.querySelector(".createnoteoption");
let notessection = document.querySelector(".hidewithnotes");
let notes = document.querySelector(".showallnotes");
const cancelbtnn = document.getElementById("cancelBtn");
let confirmdelete = document.getElementById("confirmDeleteBtn");
let logout = document.getElementsByClassName("log-out")[0];
logout.addEventListener("click", () => {
  localStorage.removeItem("token1");

  window.location.replace("signup.html");
});

function getAllNotes() {
  fetch("https://ekwvioyykteghvotgimj.supabase.co/rest/v1/notes?select=*", {
    method: "GET",

    headers: {
      Authorization: `Bearer ${logintoken}`,
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrd3Zpb3l5a3RlZ2h2b3RnaW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTE3NzgsImV4cCI6MjA5NDIyNzc3OH0.CYSDUnRWBmumDp9tl17XrsstX8bS9ogEIXXZOwsBFN8",
    },
  })
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      if (data.code === "PGRST303") {
        alert(data.message);

        localStorage.removeItem("token1");

        window.location.href = "login.html";

        return;
      }

      if (!data || data.length === 0) {
        emptystate.style.display = "block";

        notessection.style.display = "none";
      } else {
        emptystate.style.display = "none";

        notessection.style.display = "flex";
        data.sort((a, b) => {
          return new Date(b.updated_at) - new Date(a.updated_at);
        });

        displayNotes(data);
      }
    })

    .catch((error) => console.log(error));
}

getAllNotes();

function displayNotes(data) {
  let totalarraylength = document.getElementsByClassName("total-length")[0];
  totalarraylength.textContent = `${data.length} notes`;
  console.log(data.length);

  notes.innerHTML = "";

  data.forEach((item) => {
    const div = document.createElement("div");

    div.classList.add("card");

    div.innerHTML = `
            <div class="cardcontent note-card" data-id="${item.id}">


            <h3 class="ttitle" >${item.title}</h3>

            <p class="ccontent">${item.content}</p>
            <p class="ddate">Updated ${new Date(item.updated_at).toLocaleString(
              "en-GB",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              },
            )}
                
            </p>


            </div>

            <div class="cardicons">
                 <svg data-id='${item.id}' class="trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z"></path>
               </svg>
               <svg data-id='${item.id}' class="copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M352 528L128 528C119.2 528 112 520.8 112 512L112 288C112 279.2 119.2 272 128 272L176 272L176 224L128 224C92.7 224 64 252.7 64 288L64 512C64 547.3 92.7 576 128 576L352 576C387.3 576 416 547.3 416 512L416 464L368 464L368 512C368 520.8 360.8 528 352 528zM288 368C279.2 368 272 360.8 272 352L272 128C272 119.2 279.2 112 288 112L512 112C520.8 112 528 119.2 528 128L528 352C528 360.8 520.8 368 512 368L288 368zM224 352C224 387.3 252.7 416 288 416L512 416C547.3 416 576 387.3 576 352L576 128C576 92.7 547.3 64 512 64L288 64C252.7 64 224 92.7 224 128L224 352z"></path>
               </svg>

               
             

               
            </div>


        `;

    notes.appendChild(div);
  });
}

let selectedId = null;
const deletemodal = document.getElementById("deleteModal");

deletemodal.addEventListener("click", (e) => {
  if (e.target === deletemodal) {
    deletemodal.style.display = "none";

    selectedId = null;
  }
});

console.log(deletemodal);

notes.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".trash");

  if (deleteBtn) {
    selectedId = deleteBtn.dataset.id;
    console.log(selectedId);

    
    deletemodal.style.display = "flex";
    return;
  }

  const copyBtn = e.target.closest(".copy");

  if (!copyBtn) return;

  const noteId = copyBtn.dataset.id;

  const currentCard = copyBtn.closest(".card"); //parent

  const selectedNote = document.querySelector(
    `.note-card[data-id="${noteId}"]`,
  );

  const title = selectedNote.querySelector("h3").textContent;

  const content = selectedNote.querySelector("p").textContent;

  const cloneData = {
    title: `${title}(clone)`,
    content: content,
    updated_at: new Date().toISOString(),
  };

  fetch("https://ekwvioyykteghvotgimj.supabase.co/rest/v1/notes", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${logintoken}`,
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrd3Zpb3l5a3RlZ2h2b3RnaW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTE3NzgsImV4cCI6MjA5NDIyNzc3OH0.CYSDUnRWBmumDp9tl17XrsstX8bS9ogEIXXZOwsBFN8",
      Prefer: "return=representation",
    },

    body: JSON.stringify(cloneData),
  })
    .then((response) => response.json())

    .then((data) => {
      getAllNotes();

      Toastify({
        text: "Note cloned successfully",
        duration: 3000,
        gravity: "top",
        position: "center",
      }).showToast();
    })

    .catch((error) => console.log(error));
});

cancelbtnn.addEventListener("click", () => {
 
  deletemodal.style.display = "none";

  selectedId = null;
});

confirmdelete.addEventListener("click", () => {
  fetch(
    `https://ekwvioyykteghvotgimj.supabase.co/rest/v1/notes?id=eq.${selectedId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${logintoken}`,
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrd3Zpb3l5a3RlZ2h2b3RnaW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTE3NzgsImV4cCI6MjA5NDIyNzc3OH0.CYSDUnRWBmumDp9tl17XrsstX8bS9ogEIXXZOwsBFN8",
      },
    },
  )
    .then((response) => {
      Toastify({
        text: "Note deleted successfully",
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
      deletemodal.style.display = "none";
      selectedId = null;
      console.log(response);
      getAllNotes();
    })
    .catch((err) => console.log(err));
});

notes.addEventListener("click", (e) => {
  const noteCard = e.target.closest(".note-card");
  if (!noteCard) return;

  const noteId = noteCard.dataset.id;

  localStorage.setItem("noteId", noteId);

  window.location.href = "createdynamic.html";
});
