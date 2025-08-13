let todoList = [];
let elemetList = {
  name: '',
  date: ''
};
const nameInputElement = document.getElementById("name");
const dateInputElement = document.getElementById("date");

function addList() {
  const elementName = nameInputElement.value;
  const elementdate = dateInputElement.value;

  if (elementName !== "" && elementdate !== "") {
    elemetList = {
      name: elementName,
      date: elementdate
    };
    todoList.push(elemetList);
    nameInputElement.value = '';
    dateInputElement.value = '';
  }
  console.log(elemetList);
}

function showList() {
  let todoHTML = '';
  for (let i = 0; i < todoList.length; i++) {
    todoHTML += `
      <div>${todoList[i].name}</div>
      <div>${todoList[i].date}</div> 
      <button class="delete-btn">Delete</button>
    `;
  }
  document.querySelectorAll('delete-btn')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click',() => {
        clearItem(i);
      });
    });
  document.querySelector('.js-show').innerHTML = todoHTML;
}

function clearItem(index) {
  todoList.splice(index,1);
  showList();  
}