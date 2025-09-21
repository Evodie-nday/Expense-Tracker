const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

//load tasks from localStorage when page loads
document.addEventListener("DOMContentLoader", loadTasks);
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keyup", function(e){
  if(e.key === "enter"){
    addTask();
  }
});
function addTask(){
  const taskText = taskInput.ariaValueMax.trim();
  if(taskText === "")
    return;

  const li = document.createElement("li");
  li.textContent = taskText;

  // Add click to mark as done
  li.addEventListener("click", function(){
    li.classList.toggle("done");
    saveTasks();
  });

  // Add right-click to delete
  li.addEventListener("contextmenu", function(e){
    e.preventDefault();
    li.remove();
    saveTasks
  });

  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();

  //save tasks to localStorage
  function saveTasks(){
    const tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
      tasks.push({
        text: li.textContent,
        done: li.classList.contains("done")
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if(task.done) li.classList.add("done");

      li.addEventListener("click", function(){
        li.classList.toggle("done");
        saveTasks();
      });
      li.addEventListener("contextmenu", function(e){
        e.preventDefault();
        li.remove();
        saveTasks();
      });
      taskList.appendChild(li);
    });
  }
}