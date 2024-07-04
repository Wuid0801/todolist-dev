// 1. 할일을 입력하고 나면 입력창이 자동으로 비워짐 - clear
// 2. 엔터를 통해 할일을 입력할 수 있음 - clear
// 3. 입력한 할일이 없다면 할일 추가가 안됨 (즉 비어있는 할일 추가가 안됨) - clear
// 4. tab에 슬라이드바 또는 내가 어떤 탭에 있는지 표시가 되어야함 - clear
// 5. 진행중 또는 완료 탭에서 체크 버튼을 클릭하면 상태에 맞게 바로 사라지거나 다른 탭에 보여야 한다 - clear
// 6. 진행중 또는 끝남 탭에서 아이템을 삭제하면 바로 UI에 적용이 되어야 함 - clear
// 7. 기본 스타일이아닌 할일앱이 꾸며져 있어야함 + 모바일까지 반드시 되어있어야함 - clear

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
setActiveTab(document.getElementById("all"));
let mode = 'all';
let filterList = [];
let taskList = [];
let list = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function(event) {
    filter(event);
    setActiveTab(event.target);
  });
}

function setActiveTab(activeTab) {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }
  activeTab.classList.add("active");

  // 슬라이드바 이동
  underLine.style.left = `${activeTab.offsetLeft}px`;
  underLine.style.width = `${activeTab.offsetWidth}px`;
}

function validateTaskInput(taskInputValue) {
  if (taskInputValue.trim().length === 0) {
    alert("할 일을 입력 해주세요");
    return false;
  } else if (taskInputValue.trim().length > 50) {
    alert("할 일이 너무 깁니다. 짧게 입력해주세요.");
    return false;
  }
  return true;
}

function addTask() {
  if (!validateTaskInput(taskInput.value)) {
    return;
  }

  let task = {
    id: randomID(),
    taskContent: taskInput.value,
    isComplete: false
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }
  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
        <div class="task">
          <div class="task-done"><div class="task-content">${list[i].taskContent}</div></div>
          <div class="button-Container">
            <button class="button-style" onclick="toggleComplete('${list[i].id}')"><i class="fa fa-undo"></i></button>
            <button class="button-style" onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
          </div>
        </div>
      `;
    } else {
      resultHTML += `
        <div class="task">
          <div><div class="task-content">${list[i].taskContent}</div></div>
          <div class="button-Container">
            <button class="button-style" onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
            <button class="button-style" onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
          </div>
        </div>
      `;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filterTasks();
}

function filter(event) {
  mode = event.target.id;
  filterTasks();
}

function filterTasks() {
  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    filterList = taskList.filter(task => !task.isComplete);
    render();
  } else if (mode === "done") {
    filterList = taskList.filter(task => task.isComplete);
    render();
  }
}

function randomID() {
  return '_' + Math.random().toString(36).substring(2, 9);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filterTasks();
}
