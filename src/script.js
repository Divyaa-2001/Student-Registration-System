// const inputs = document.querySelectorAll("form input");
// const submitbtn = document.getElementById("submit");
// const tableBody = document.querySelector("tbody");
// const tableContainer = document.querySelector(".table-container");


// let currentRow = null;
// document.addEventListener("DOMContentLoaded", loadStudents);

// // Add and Update student
// submitbtn.addEventListener('click', function () {
//     let students = {};
//     inputs.forEach(input => {
//         students[input.name] = input.value.trim();
//     });

//     if (!validateForm(students)) return;

//     if (currentRow) {
//         //  UPDATE EXISTING ROW
//         updateStudentInStorage(currentId, students);
//         const cells = currentRow.querySelectorAll("td");
//         cells[0].textContent = students.name;
//         cells[1].textContent = students.id;
//         cells[2].textContent = students.email;
//         cells[3].textContent = students.contact;

//         submitbtn.textContent = "Submit";
//         currentRow = null;
//         currentId = null;
//     } else {
//         // adding new row
//         addRowToTable(students);
//         saveStudentToStorage(students);
//     }

//     inputs.forEach(input => (input.value = ""));
// });

// tableBody.addEventListener("click", function (e) {
//     if (e.target.closest(".delete")) {
//         const row = e.target.closest("tr");
//         const id = row.querySelectorAll("td")[1].textContent;
//         deleteStudentFromStorage(id);
//         row.remove();
//     }

//     if (e.target.closest(".edit")) {
//         currentRow = e.target.closest("tr");
//         const cells = currentRow.querySelectorAll("td");

//         inputs[0].value = cells[0].textContent;
//         inputs[1].value = cells[1].textContent;
//         inputs[2].value = cells[2].textContent;
//         inputs[3].value = cells[3].textContent;

//         currentId = cells[1].textContent;
//         submitbtn.textContent = "Update Student";
//     }
// });


// // Validation function
// function validateForm(students) {
//     if (!/^[A-Za-z ]+$/.test(students.name)) {
//         alert("Name should contain only alphabets");
//         return false;
//     }
//     if (!/^[0-9]+$/.test(students.id)) {
//         alert("ID should contain only numbers");
//         return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(students.email)) {
//         alert("Enter a valid email");
//         return false;
//     }
//     if (!/^[0-9]{10}$/.test(students.contact)) {
//         alert("Contact should be a 10-digit number");
//         return false;
//     }
//     return true;
// }

// // Add row to table
// function addRowToTable(students) {
//     const newRow = document.createElement("tr");
//     newRow.innerHTML = `
//         <td class="text-center p-2 border">${students.name}</td>
//         <td class="text-center p-2 border">${students.id}</td>
//         <td class="text-center p-2 border">${students.email}</td>
//         <td class="text-center p-2 border">${students.contact}</td>
//         <td class="text-center p-2 border">
//             <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
//             <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
//         </td>
//     `;
//     tableBody.appendChild(newRow);

// }


// // Save new student
// function saveStudentToStorage(student) {
//     let students = JSON.parse(localStorage.getItem("students")) || [];
//     students.push(student);
//     localStorage.setItem("students", JSON.stringify(students));
// }

// // Load students on page load
// function loadStudents() {
//     let students = JSON.parse(localStorage.getItem("students")) || [];
//     students.forEach(student => addRowToTable(student));
// }

// // Update student in storage
// function updateStudentInStorage(id, updatedStudent) {
//     let students = JSON.parse(localStorage.getItem("students")) || [];
//     let index = students.findIndex(s => s.id === id);
//     if (index !== -1) {
//         students[index] = updatedStudent;
//         localStorage.setItem("students", JSON.stringify(students));
//     }
// }

// // Delete student from storage
// function deleteStudentFromStorage(id) {
//     let students = JSON.parse(localStorage.getItem("students")) || [];
//     students = students.filter(s => s.id !== id);
//     localStorage.setItem("students", JSON.stringify(students));
// }


const inputs = document.querySelectorAll("form input");
const submitbtn = document.getElementById("submit");
const tableBody = document.querySelector("tbody");

let currentRow = null; // to track the row being edited

// --- Load students from localStorage when page loads ---
document.addEventListener("DOMContentLoaded", loadStudents);

// Add / Update student
submitbtn.addEventListener('click', function () {
    let students = {};
    inputs.forEach(input => {
        students[input.name] = input.value.trim();
    });

    if (!validateForm(students)) return; // validation

    if (currentRow) {
        // --- UPDATE EXISTING ROW ---
        const cells = currentRow.querySelectorAll("td");
        cells[0].textContent = students.name;
        cells[1].textContent = students.id;
        cells[2].textContent = students.email;
        cells[3].textContent = students.contact;

        updateStudentInStorage(currentRow.rowIndex - 1, students);

        submitbtn.textContent = "Submit"; // reset button text
        currentRow = null; // reset tracker
    } else {
        // --- ADD NEW ROW ---
        addRowToTable(students);
        saveStudentToStorage(students);
    }

    // Clear form
    inputs.forEach(input => (input.value = ""));
});

// Event delegation for table actions
tableBody.addEventListener("click", function (e) {
    if (e.target.closest(".delete")) {
        const row = e.target.closest("tr");
        const index = row.rowIndex - 1; // adjust for header row
        deleteStudentFromStorage(index);
        row.remove(); // Delete row
    }

    if (e.target.closest(".edit")) {
        currentRow = e.target.closest("tr"); // save row
        const cells = currentRow.querySelectorAll("td");

        inputs[0].value = cells[0].textContent; // name
        inputs[1].value = cells[1].textContent; // id
        inputs[2].value = cells[2].textContent; // email
        inputs[3].value = cells[3].textContent; // contact

        submitbtn.textContent = "Update Student"; // change button label
    }
});

// ----------------- FUNCTIONS -----------------

// Validation function
function validateForm(students) {
    if (!/^[A-Za-z ]+$/.test(students.name)) {
        alert("Name should contain only alphabets");
        return false;
    }
    if (!/^[0-9]+$/.test(students.id)) {
        alert("ID should contain only numbers");
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(students.email)) {
        alert("Enter a valid email");
        return false;
    }
    if (!/^[0-9]{10}$/.test(students.contact)) {
        alert("Contact should be a 10-digit number");
        return false;
    }
    return true;
}

// Add row to table
function addRowToTable(students) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td class="text-center p-2 border">${students.name}</td>
        <td class="text-center p-2 border">${students.id}</td>
        <td class="text-center p-2 border">${students.email}</td>
        <td class="text-center p-2 border">${students.contact}</td>
        <td class="text-center p-2 border">
            <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
        </td>
    `;
    tableBody.appendChild(newRow);
}

// ----------------- LOCAL STORAGE FUNCTIONS -----------------

// Save new student
function saveStudentToStorage(student) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

// Load students on page load
function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach(student => addRowToTable(student));
}

// Update student in storage
function updateStudentInStorage(index, updatedStudent) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students[index] = updatedStudent;
    localStorage.setItem("students", JSON.stringify(students));
}

// Delete student from storage
function deleteStudentFromStorage(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
}


