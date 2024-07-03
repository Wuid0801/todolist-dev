// 유저 값 입력
// + 버튼 누르면 할 일 추가
// delete 버튼 누르면 할일 삭제
// check 버튼은 밑줄 
// 진행중 끝남 탭을 누르면, 언더바가 이동
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭은 전체 아이템
// 1.check와 delete가 아이콘이어야 함
// 2.check버튼 클릭시 뒤에 배경이 회색으로 바뀌어야함 - clear
// 3.check버튼 클릭 후 되돌리기 버튼이 나오고 클릭하면 뒤에 배경이 다시 돌아오고 버튼도 다시 체크로 바꿈
// 4.삭제기능이 있어야함 - clear

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");


let taskList = []
addButton.addEventListener("click", addTask);


function addTask() {
  let task = {
    id: randomID(),
    taskContent: taskInput.value,
    isComplete: false
  }
  taskList.push(task);
  console.log(taskList)
  render();
}
function render() {
  let resultHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `
        <div class="task">
            <div class="task-done"><div class="task-content">${taskList[i].taskContent}</div></div>
            <div class="button-Container">
              <button class="button-style" onclick="toggleComplete('${taskList[i].id}')"><i class="fa fa-undo"></i></button>
              
              <button class="button-style" onclick="deleteTask('${taskList[i].id}')"><i class="fa fa-trash"></i></button>
              
            </div>
          </div>
          `;
    } else {
      resultHTML += `
      <div class="task">
          <div><div class="task-content">${taskList[i].taskContent}</div></div>
          <div class="button-Container">
            <button class="button-style" onclick="toggleComplete('${taskList[i].id}')"><i class="fa fa-check"></i></button>
            
            <button class="button-style" onclick="deleteTask('${taskList[i].id}')"><i class="fa fa-trash"></i></button>
            
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
  render();
}

function randomID() {
  return '_' + Math.random().toString(36).substring(2, 9);
}

function deleteTask(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id==id){
      taskList.splice(i,1);
      break;
    }
  }
  render();
}