const title = document.getElementById("title");
const input = document.getElementById("input"); // input field
const buttonAddTask = document.getElementById("button"); //add task button
const list = document.getElementById("list"); // main list for task
const buttonClearCompleted = document.getElementById("clearCompleted");

buttonAddTask.addEventListener("click", addTask); // button add task
input.addEventListener("keypress", (e) => keyboardPress(e)) //enter add task
input.focus(); //return cursor on the input field
buttonClearCompleted.addEventListener("click", () => clearCompleted());

function addTask(){
    const text = input.value.trim(); //name of the task
    const span = document.createElement("span"); //span for data storing

    if(text === ""){ //check for null string
        input.value = "";
        return;
    }

    const li = document.createElement("li");
    span.textContent = text; //for css

    const completeButton = document.createElement("button");
    completeButton.textContent = "✓";
    completeButton.classList.add("completeButton");
    completeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleTaskDone(li);
    });

    const deleteButton = document.createElement("button"); //delete button
    deleteButton.textContent = "✕";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevents click from bubbling to li
        deleteTask(li);
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(buttonContainer);
    list.appendChild(li); // func's local li to the main list

    input.value = "";
    input.focus();
}

function deleteTask(element){
    element.remove();
    input.focus(); //return cursor to the input field
}

function toggleTaskDone(element){
    element.classList.toggle("done");

    // Change button text based on done state
    const completeBtn = element.querySelector(".completeButton");
    if(element.classList.contains("done")) {
        completeBtn.textContent = "↺"; // Show undo icon
    } else {
        completeBtn.textContent = "✓"; // Show checkmark
    }

    input.focus();
}

function keyboardPress(keyPressed){   //checks enter input
    if(keyPressed.key === "Enter"){
        addTask();
    }
}

function clearCompleted(){
    const completedTasks = list.querySelectorAll("li.done");

    completedTasks.forEach(task => {
        task.remove();
    });

    input.focus(); // Return focus to input
}