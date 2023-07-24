const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Function to save notes to local storage
function saveNotesToLocalStorage() {
    const notes = [];
    const inputBoxes = document.querySelectorAll(".input-box");

    inputBoxes.forEach(inputBox => {
        notes.push(inputBox.textContent);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to load notes from local storage
function loadNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem("notes"));

    if (notes) {
        notes.forEach(note => {
            const noteItem = createNoteItem(note);
            notesContainer.appendChild(noteItem);
        });
    }
}

// Function to create the delete button
function createDeleteButton() {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.style.marginRight = "25px"; // Add spacing between delete and save buttons
    deleteBtn.style.marginLeft = "30px"; // Add spacing between delete and save buttons
    return deleteBtn;
}

// Function to create the save button
function createSaveButton() {
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "save-btn";
    saveBtn.style.marginRight = "5px"; // Add spacing between delete and save buttons
    return saveBtn;
}

// Function to create a note item with both delete and save buttons
function createNoteItem(note) {
    const noteItem = document.createElement("div");
    noteItem.className = "note-item";
    noteItem.style.display = "flex";
    noteItem.style.alignItems = "center";
    noteItem.style.marginBottom = "5px"; // Add some spacing between note items

    const inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.textContent = note;

    const deleteBtn = createDeleteButton();
    const saveBtn = createSaveButton();

    noteItem.appendChild(inputBox);
    noteItem.appendChild(deleteBtn);
    noteItem.appendChild(saveBtn);

    // Add event listener to the delete button to remove the note item
    deleteBtn.addEventListener("click", () => {
        notesContainer.removeChild(noteItem);
        saveNotesToLocalStorage(); // Save the updated notes after deleting
    });

    // Add event listener to the save button to update the note item
    saveBtn.addEventListener("click", () => {
        saveNotesToLocalStorage(); // Save the notes when the save button is clicked
        alert("Notes have been saved!"); // You can display a message to indicate successful save
    });

    return noteItem;
}

// Function to add a new note item to the notes container
function addNewNoteItem() {
    const noteItem = createNoteItem("");
    notesContainer.appendChild(noteItem);
    saveNotesToLocalStorage(); // Save the new note to local storage
}

// Check if the screen width is less than or equal to 600px and make the note items responsive
function makeNoteItemsResponsive() {
    const noteItems = document.querySelectorAll(".note-item");
    if (window.innerWidth <= 600) {
        noteItems.forEach(noteItem => {
            noteItem.style.flexDirection = "column"; // Stack items vertically
            noteItem.style.marginBottom = "10px"; // Add spacing between stacked note items
            noteItem.style.display = "flex";
        });
    } else if (window.innerWidth <= 650) {
        noteItems.forEach(noteItem => {
            noteItem.style.flexDirection = "row"; // Inline layout
            noteItem.style.marginBottom = "5px"; // Reset margin for inline layout

            // Apply additional styles for buttons at 650px breakpoint
            const deleteBtn = noteItem.querySelector(".delete-btn");
            const saveBtn = noteItem.querySelector(".save-btn");
            deleteBtn.style.marginRight = "5px";
            deleteBtn.style.marginLeft = "10px";
            saveBtn.style.marginRight = "5px";
        });
    } else {
        noteItems.forEach(noteItem => {
            noteItem.style.flexDirection = "row"; // Reset to horizontal layout
            noteItem.style.marginBottom = "5px"; // Reset margin for horizontal layout

            // Reset button styles for screen width greater than 650px
            const deleteBtn = noteItem.querySelector(".delete-btn");
            const saveBtn = noteItem.querySelector(".save-btn");
            deleteBtn.style.marginRight = "25px";
            deleteBtn.style.marginLeft = "30px";
            saveBtn.style.marginRight = "5px";
        });
    }
}

// Add event listener to window resize to handle responsiveness
window.addEventListener("resize", () => {
    makeNoteItemsResponsive();
});

createBtn.addEventListener("click", () => {
    addNewNoteItem();
});

// Load existing notes from local storage when the page loads
loadNotesFromLocalStorage();
