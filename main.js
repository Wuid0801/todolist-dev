// 유저 값 입력
// + 버튼 누르면 할 일 추가
// delete 버튼 누르면 할일 삭제
// check 버튼은 밑줄 
// 진행중 끝남 탭을 누르면, 언더바가 이동
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭은 전체 아이템

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");


let taskList = []
addButton.addEventListener("click", addTask);


function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    render();
}
function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `
        <div class="task">
            <div>${taskList[i]}</div>
            <div>
              <button>Check</button>
              <button>delete</button>
            </div>
          </div>
          `;
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}
