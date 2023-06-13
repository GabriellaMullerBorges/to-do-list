const toDoInput = document.querySelector('todo-input');
const toDoList = []

toDoInput.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        toDoList.push(event.target.value);
        console.log(toDoList);
        newToDo(event.target.value)
        toDoInput = "";
    }
})

function newToDo(valor){
    const toDoDiv =  document.createElement("div");
    const toDoText = document.createElement("p");
    const toDoCheckbox = document.createElement("input");
    const toDoCheckboxLabel = document.createElement("label");
    const toDoX = document.createElement("span");


    toDoText.textContent = value;
    toDoCheckbox.type = "checkbox";
    toDoCheckbox.name = "checkbox";
    toDoCheckboxLabel.htmlFor = "checkbox"

    toDoCheckboxLabel.addEventListener('click', function(e){
        if(toDoCheckbox.checked){
            toDoCheckbox.checked = false;
            toDoText.style.textDecoration = 'none';
            toDoCheckboxLabel.classList.remove('active');
        }else {
            toDoCheckbox.checked= true;
            toDoText.style.textDecoration = "line-through";
            toDoCheckboxLabel.classList.add('active')
        }
    })
}

