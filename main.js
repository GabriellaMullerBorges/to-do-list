const todoInput = document.querySelector('.todo-input');
const todosContainer = document.querySelector(".todos")
const countCompletedDiv = document.querySelector(".completedCount")
const remarks = document.querySelector(".remarks")

var elem = null;
var todos = []

document.addEventListener("DOMContentLoaded", function() {
    var storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      todos = JSON.parse(storedTodos);
      renderTodos();
      countCompleted();
    }
  });
  
 todoInput.addEventListener("keyup", function (e){
    if(e.key === "Enter" || e.keyCode === 13){
       todos.push({
        value: e.target.value, 
        checked:false
    });
        console.log(todos);
        newTodo(e.target.value)
        todoInput.value = "";
        countCompleted();
        saveTodos();
    }
});
 
function newTodo(value){
    const todo =  document.createElement("div");
    const todoText = document.createElement("p");
    const todoCheckbox = document.createElement("input");
    const todoCheckboxLabel = document.createElement("label");
    const todoCross = document.createElement("span");

    /*let obj = todos.find((t) =>  t.value === value) ;*/

    todoText.textContent = value;
    todoCheckbox.type = "checkbox";
    todoCheckbox.name = "checkbox";
    todoCheckboxLabel.htmlFor = "checkbox";

    todoCheckboxLabel.addEventListener('click', function(){    
        if(todoCheckbox.checked){
            todoCheckbox.checked = false;
            todoText.style.textDecoration = 'none';
            todoCheckboxLabel.classList.remove('active');
            updateTodos(value, false)
           /* obj.checked = false;*/
            console.log(todos)
            countCompleted();
            saveTodos();
        }else {
           /* obj.checked = true; */
            updateTodos(value, true)
             console.log(todos)
            countCompleted();
            todoCheckbox.checked= true;
            todoText.style.textDecoration = "line-through";
            todoCheckboxLabel.classList.add('active');
            saveTodos();
        }
    })

    todoCross.textContent = "X";
    todoCross.addEventListener("click", function (e){
        e.target.parentElement.remove();
       todos = todos.filter((t) => t.value !== value);
        countCompleted();
        console.log(todos);
        saveTodos();
    });

    todo.classList.add("todo");
    todoCheckboxLabel.classList.add("circle");
    todoCross.classList.add("cross");

    todo.appendChild(todoCheckbox);
    todo.appendChild(todoCheckboxLabel)
    todo.appendChild(todoText)
    todo.appendChild(todoCross);

    todo.draggable = true

    todo.addEventListener("dragstart", (e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", null);
        elem = e.target;
        console.log(elem)
    });

    todo.addEventListener("dragover", (e) => {
        let el1;
        e.preventDefault();
        if(e.target.classList.contains("todo")){
            el1= e.target;
        }else {
            el1 = e.target.parentElement
        };

        if (isBefore (elem.el1)){
            el1.parentNode.insertBefore(elem, el1);
        } else { 
            el1.parentNode.insertBefore(elem, el1.nextSibiling);
        }
    });

    todo.addEventListener("dragend", () => {
        elem = null;

        let index = todos.findIndex((t) => t.value === value);
        todos.slplice(index,1);
        if (todo.nextSibling){
            let index1 = todos.findIndex (
                (t) => t.value === todo.nextSibling.querySelector("p").textContent
            );
            todos.splice(index1,0, {
                value: value,
                checked: todo.querySelector("input").checked
            });
        } else {
            todos.push({
                value:value,
                checked: todo.querySelector("input").checked
            });
        }
    });

  todosContainer.appendChild(todo);
}

function isBefore(el1, el2){
    for (
        var cur = el1.previousSibiling;
        cur && cur.nodeType !== 9;
        cur = cur.previousSibiling
    )
    if(cur === el2)return true; 
    return false;
}

function updateTodos(value, boolean){
    todos.forEach((t) => {
    if (t.value === value) {
        t.checked = boolean;
    }
    })
}

function countCompleted(){
    countCompletedDiv.textContent = `${todos.filter((t) => t.checked === false).length} itens left`
}

function showAll() {
    document.querySelectorAll(".filter div").forEach((d,i)=>{
        if ( i=== 1) {
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
    document.querySelectorAll(".filters div").forEach((d,i)=>{
        if ( i=== 2) {
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
        if ( i=== 2) {
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
    todos = todos.filter((t) => t.checked !== true);
    document.querySelectorAll(".todo").forEach((todo) => {
        if(todo.querySelector("input").checked){
            todo.remove();
        }
    })
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function renderTodos() {
    todos.forEach(function (todo) {
      newTodo(todo.value);
      if (todo.checked) {
        const todoElement = todosContainer.lastChild;
        const checkbox = todoElement.querySelector("input");
        const todoText = todoElement.querySelector("p");
        checkbox.checked = true;
        todoText.style.textDecoration = "line-through";
        todoElement.querySelector("label").classList.add('active');
      }
    });
  }