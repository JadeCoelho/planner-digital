const tarefaInput = document.querySelector(".tarefa-input input"),
  filtros = document.querySelectorAll(".filtros span"),
  limparTudo = document.querySelector(".btn-limpar"),
  tarefaCx = document.querySelector(".tarefa-cx");
let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list"));
filtros.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.ativo").classList.remove("ativo");
    btn.classList.add("ativo");
    showTodo(btn.id);
  });
});
function showTodo(filtro) {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completo = todo.status == "completo" ? "checked" : "";
      if (filtro == todo.status || filtro == "all") {
        li += `<li class="tarefa">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completo}>
                                <p class="${completo}">${todo.name}</p>
                            </label>
                            <div class="config">
                                <i onclick="showMenu(this)" class="edit material-icons">more_vert</i>
                                <ul class="tarefa-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="edit material-icons">edit</i></li>
                                    <li onclick='deleteTask(${id}, "${filtro}")'><i class="edit material-icons">delete</i></li>
                                </ul>
                            </div>
                        </li>`;
      }
    });
  }
  tarefaCx.innerHTML = li || `<span>Sem tarefas aqui.</span>`;
  let checkTask = tarefaCx.querySelectorAll(".task");
  !checkTask.length
    ? limparTudo.classList.remove("ativo")
    : limparTudo.classList.add("ativo");
  tarefaCx.offsetHeight >= 200
    ? tarefaCx.classList.add("overflow")
    : tarefaCx.classList.remove("overflow");
}
showTodo("all");
function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("mostrar");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("mostrar");
    }
  });
}
function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completo";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pendente";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}
function editTask(taskId, textName) {
  editId = taskId;
  isEditTask = true;
  tarefaInput.value = textName;
  tarefaInput.focus();
  tarefaInput.classList.add("ativo");
}
function deleteTask(deleteId, filtro) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(filtro);
}
limparTudo.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});
tarefaInput.addEventListener("keyup", (e) => {
  let userTask = tarefaInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { name: userTask, status: "pendente" };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    tarefaInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.ativo").id);
  }
});
