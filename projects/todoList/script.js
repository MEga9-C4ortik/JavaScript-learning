const title = document.getElementById("title");
const button = document.getElementById("button");
const input = document.getElementById("input");
const list = document.getElementById("list");

button.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => keyboardPress(e))
input.focus();

function addTask(){
    const text = input.value.trim();
    const span = document.createElement("span");

    if(text === ""){
        input.value = "";
        return;
    }

    const li = document.createElement("li");
    span.textContent = text;

    li.addEventListener("click", () => toggleTaskDone(li));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () => deleteTask(li));

    li.appendChild(span);
    li.appendChild(deleteButton);
    list.appendChild(li);

    input.value = "";
    input.focus();
}

function deleteTask(element){
    element.remove();
    input.focus();
}

function toggleTaskDone(element){
    element.classList.toggle("done");
}

function keyboardPress(keyPressed){
    if(keyPressed.key === "Enter"){
        addTask();
    }
}