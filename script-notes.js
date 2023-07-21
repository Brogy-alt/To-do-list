const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let deleteBtn = document.createElement("button");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    notesContainer.appendChild(inputBox);
    notesContainer.appendChild(deleteBtn);

    // Add a click event listener to the delete button to remove the note
    deleteBtn.addEventListener("click", () => {
        notesContainer.removeChild(inputBox);
        notesContainer.removeChild(deleteBtn);
    });
});
