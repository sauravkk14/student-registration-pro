
let editId = null;


//Function For Adding Students on Add Button Click

function handleClick(event) {
    event.preventDefault();

    const studentName = document.getElementById("student-name").value;
    const studentId = document.getElementById("student-id").value;
    const studentEmail = document.getElementById("student-email").value;
    const studentContact = document.getElementById("student-contact").value;

    const existingError = document.getElementById("error-message");
    if (existingError) {
        existingError.remove();
    }

    let errorMessage = "";

//If condition for matching the patterns according to the requirements i.e Validations

    if (!studentName || !studentId || !studentEmail || !studentContact) {
        errorMessage = "Please Fill Details !";
    } else {
        const namePattern = /\d/;
        if (studentName.match(namePattern)) {
            errorMessage += "Name Should Not Contain Numbers !<br>";
        }
        const studentIDPattern = /^\d{6}$/;
        if (!studentId.match(studentIDPattern)) {
            errorMessage += "ID Must Be Of Six Digit Number !<br>";
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(studentEmail)) {
            errorMessage += "Please Enter Your Correct Email-Id !<br>";
        }

        const contactPattern = /^\d{10}$/;
        if (!contactPattern.test(studentContact)) {
            errorMessage += "Please Enter Only 10-digit Mobile Number !<br>";
        }
    }

    if (errorMessage) {
        const para = document.createElement("p");
        para.id = "error-message";
        para.className = "error";
        para.style.marginTop = "10px";
        para.innerHTML = errorMessage;
        document.getElementById("message").appendChild(para);
        return;
    }

//Created an Object studentData for further storing the value as in a JSON Format to the local storage

    const studentData = {
        name: studentName,
        id: studentId,
        email: studentEmail,
        contact: studentContact
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];

    if (editId) {
        //Editing students existing data and pushing them into local storage
        //map method is used to match each student id with edit id and if matched then pushing the studentData in local storage
        students = students.map(student => student.id === editId ? studentData : student);
        
        localStorage.setItem('students', JSON.stringify(students));

        const rowToEdit = document.querySelector(`tbody tr[data-student-id="${editId}"]`);
        if (rowToEdit) {
            rowToEdit.innerHTML = `
                <td>${studentName}</td>
                <td>${studentId}</td>
                <td>${studentEmail}</td>
                <td>${studentContact}</td>
                <td>
                    <button onclick="handleEditClick('${studentId}')" class="fa-solid fa-pen-to-square edit"></button>
                    <button onclick="handleDeleteClick('${studentId}')" class="fa-solid fa-trash delete"></button>
                </td>
            `;
        }
        document.getElementById("submit-button").innerHTML = "Add"; 
        editId = null;
    } else {
        //Adding students data and pushing them into local storage
        students.push(studentData);
        localStorage.setItem('students', JSON.stringify(students));

        const newRow = document.createElement("tr");
        newRow.setAttribute("data-student-id", studentId);
        newRow.innerHTML = `
            <td>${studentName}</td>
            <td>${studentId}</td>
            <td>${studentEmail}</td>
            <td>${studentContact}</td>
            <td class="buttons">
                <button onclick="handleEditClick('${studentId}')" class="fa-solid fa-pen-to-square edit"></button>
                <button onclick="handleDeleteClick('${studentId}')" class="fa-solid fa-trash delete"></button>
            </td>
        `;

        document.querySelector("tbody").appendChild(newRow);
    }

    document.getElementById("student-name").value = "";
    document.getElementById("student-id").value = "";
    document.getElementById("student-email").value = "";
    document.getElementById("student-contact").value = "";
}

//function bodyload refresh the page through an onload method and get the students data from local storage and display in the table
const bodyload = function() {
    const students = JSON.parse(localStorage.getItem('students')) || [];

    students.forEach(student => {
        const newRow = document.createElement("tr");
        newRow.setAttribute("data-student-id", student.id);
        newRow.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="buttons">
                <button onclick="handleEditClick('${student.id}')" class="fa-solid fa-pen-to-square edit"></button>
                <button onclick="handleDeleteClick('${student.id}')" class="fa-solid fa-trash delete"></button>
            </td>
        `;
        document.querySelector("tbody").appendChild(newRow);
    });
}

// function for Editing the students data
function handleEditClick(studentId) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentToEdit = students.find(student => student.id === studentId);

    if (studentToEdit) {
        document.getElementById("student-name").value = studentToEdit.name;
        document.getElementById("student-id").value = studentToEdit.id;
        document.getElementById("student-email").value = studentToEdit.email;
        document.getElementById("student-contact").value = studentToEdit.contact;
        document.getElementById("submit-button").innerHTML = "Update";
        editId = studentId;
    }
}
// function for Deleting the students data

function handleDeleteClick(studentId) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.id !== studentId);
    localStorage.setItem('students', JSON.stringify(students));

    const rowToDelete = document.querySelector(`tbody tr[data-student-id="${studentId}"]`);
    if (rowToDelete) {
        rowToDelete.remove();
    }
}
