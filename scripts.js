const list = document.getElementById("todo-list");
function saveTasks() {
    const tasks = [];
    list.querySelectorAll("li").forEach(li => {
        const textSpan = li.querySelector("span");
        if(textSpan) {
            tasks.push(textSpan.innerText);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.innerText = task;
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btn-grp");
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid");
        editIcon.classList.add("fa-pen");
        editBtn.appendChild(editIcon);
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid","fa-xmark");
        deleteBtn.appendChild(deleteIcon);
        li.classList.add("todo");
        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(deleteBtn);
        li.appendChild(textSpan);
        li.appendChild(btnDiv);
        list.appendChild(li);
    })
}
window.addEventListener("load",loadTasks);
window.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector("#todo-input");
    const txt = input.value;
    if (txt) {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.innerText = txt;
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btn-grp");
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid");
        editIcon.classList.add("fa-pen");
        editBtn.appendChild(editIcon);
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        const deleteIcon = document.createElement("i");;
        deleteIcon.classList.add("fa-solid","fa-xmark");
        deleteBtn.appendChild(deleteIcon);
        li.classList.add("todo");
        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(deleteBtn);
        li.appendChild(textSpan);
        li.appendChild(btnDiv);
        list.appendChild(li);
        input.value = "";
        saveTasks();
    }
    else {
        alert("Please enter a task");
    }
});

list.addEventListener("click", (e) => {
    if(e.target.closest(".edit-btn")) {
        const li = e.target.closest("li");
        const textSpan = li.querySelector("span");
        const currentText = textSpan.innerText;
        const input = document.createElement("input");
        input.classList.add("edit-input");
        input.type = "text";
        input.value = currentText;
        textSpan.replaceWith(input);
        input.focus();
        input.addEventListener("blur", () => { saveEdit(input,li);
            saveTasks();
        });
       input.addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
            saveEdit(input,li);
            saveTasks();
        }
       }) 
    }
    if(e.target.closest(".delete-btn")) { 
        const li = e.target.closest("li");
        li.remove();
        saveTasks();
    }   
})

function saveEdit(input, li) {
    const newText = input.value;
    const textSpan = document.createElement("span");
    textSpan.innerText = newText;
    input.replaceWith(textSpan);
}