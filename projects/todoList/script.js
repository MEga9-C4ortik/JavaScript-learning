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

    span.addEventListener("click", () => toggleTaskDone(li)); //click for done

    const deleteButton = document.createElement("button"); //delete button
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevents click from bubbling to li
        deleteTask(li);
        input.focus();git
    });

    li.appendChild(span);
    li.appendChild(deleteButton);
    list.appendChild(li); // func's local li to the main list

    input.value = "";
    input.focus();
}

function deleteTask(element){
    element.remove();
    input.focus(); //return cursor to the input field
}

function toggleTaskDone(element){ //marks task as done
    element.classList.toggle("done");
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