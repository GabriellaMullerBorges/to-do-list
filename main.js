const todoInput = document.querySelector('.todo-input');
const todosContainer = document.querySelector(".todos")
const countCompletedDiv = document.querySelector(".completedCount")

var todos = []

todoInput.addEventListener("keyup", function (e){
    if(e.key === "Enter" || e.keyCode === 13){
       todos.push({value: e.target.value, checked:false});
        console.log(todos);
        newTodo(e.target.value)
        todoInput.value = "";
        countCompleted();
    }
});


function newTodo(value){
    const todo =  document.createElement("div");
    const todoText = document.createElement("p");
    const todoCheckbox = document.createElement("input");
    const todoCheckboxLabel = document.createElement("label");
    const todoCross = document.createElement("span");

    let obj = todos.find((t) =>  t.value === value) ;

    todoText.textContent = value;
    todoCheckbox.type = "checkbox";
    todoCheckbox.name = "checkbox";
    todoCheckboxLabel.htmlFor = "checkbox";

    todoCheckboxLabel.addEventListener('click', function(_e){    
        if(todoCheckbox.checked){
            todoCheckbox.checked = false;
            todoText.style.textDecoration = 'none';
            todoCheckboxLabel.classList.remove('active');
            obj.checked = false;
            console.log(todos)
            countCompleted();
        }else {
            obj.checked = true; 
            console.log(todos)
            countCompleted();
            todoCheckbox.checked= true;
            todoText.style.textDecoration = "line-through";
            todoCheckboxLabel.classList.add('active')
        }
    })
 
    todoCross.textContent = "X";
    todoCross.addEventListener("click", function (e){
        e.target.parentElement.remove();
        todos = todos.filter((t) => t !== obj);
        countCompleted();
        console.log(todos)
    });

    todo.classList.add("todo");
    todoCheckboxLabel.classList.add("circle");
    todoCross.classList.add("cross");

    todo.appendChild(todoCheckbox);
    todo.appendChild(todoCheckboxLabel)
    todo.appendChild(todoText)
    todo.appendChild(todoCross)

    todosContainer.appendChild(todo);

}


function countCompleted(){
    countCompletedDiv.textContent = `${todos.filter((t) => t.checked === false).length} itens left`
}

function showAll() {
    document.querySelectorAll(".filter div").forEach((d,i)=>{
        if ( i=== 0) {
            d.classList.add("filterActive")
        } else {
            d.classList.remove("filterActive")
        }
    } )
    document.querySelectorAll(".todo").forEach((todo) => {  
        todo.style.display = "grid"; 
     })
}

function filterActive() {
    document.querySelectorAll(".filter div").forEach((d,i)=>{
        if ( i=== 0) {
            d.classList.add("filterActive")
        } else {
            d.classList.remove("filterActive")
        }
    } )
 document.querySelectorAll(".todo").forEach((todo) => {
    todo.style.display = "grid";
    if(todo.querySelector("input").checked){
        todo.style.display = "none"
    }
 })
}

function filterCompleted() {
    document.querySelectorAll(".filter div").forEach((d,i)=>{
        if ( i=== 0) {
            d.classList.add("filterActive")
        } else {
            d.classList.remove("filterActive")
        }
    } )
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
        if(!todo.querySelector("input").checked){
            todo.style.display = "none"
        }
     })
}

function clearCompleted(){
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
        if(todo.querySelector("input").checked){
            todo.remove();
        }
     })
}