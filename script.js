const addButton = document.querySelector("#add");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  textAreaData.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const htmlData = ` <div class="operation">
  <button class="edit">
    <i class="fa-solid fa-pen-to-square"></i>
  </button>
  <button class="delete"><i class="fa-solid fa-trash"></i></button>
</div>
<div class="main ${text ? "" : "hidden"}"><pre class='text'></pre></div>
<textarea class="${text ? "hidden" : ""} "></textarea>`;

  note.insertAdjacentHTML("afterbegin", htmlData);

  //Get Refrences
  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const mainDivTxt = note.querySelector(".text");
  const textArea = note.querySelector("textarea");

  //Deleting the note

  delButton.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  //toggle using edit button
  textArea.innerHTML = text;
  mainDivTxt.innerHTML = text;

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDivTxt.innerHTML = value;
    updateLSData();
  });

  document.getElementById("notes-container").appendChild(note);
};

// Getting data from local Storage
const notes = JSON.parse(localStorage.getItem("notes"));
console.log(notes);
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener("click", () => addNewNote());
