// 할일 입력창
const todoInput = document.querySelector("#todo-input");

//추가버튼
const addBtn = document.querySelector(".add-btn");

//ul 리스트
const todoList = document.querySelector(".todo-list");

//비어있을때 문구
const emptyText = document.querySelector(".empty-text");

//삭제버튼
// const deleteBtn = document.querySelector(".delete-btn");

/**
 * TODO(할일) 렌더링하기
 */
function renderTodoList(todos) {
  todoList.innerHTML = "";

  // todos가 아니거나 없으면 "아직 등록된 할일이 없습니다" text 보이기
  if (!todos || todos.length === 0) {
    emptyText.style.display = "block";
  } else {
    // 아니면 숨기기
    emptyText.style.display = "none";
  }
  //배열에서 객체를 하나씩 꺼내서 li 를 만든다
  todos.forEach((todo) => {
    // li 생성
    const li = document.createElement("li");
    li.className = "todo-item";

    // li 내부 왼쪽(체크박스와 텍스트) 감싼 div 생성
    const left = document.createElement("div");
    left.className = "todo-left";

    // <input type="checkbox"> type이 checkbox인 체크박스 만들기
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = todo.done; // 기본값 false

    // 할일 제목(title)을 넣을 span 생성
    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.title; // 받아온 todd의 title을 text로 넣는다

    // 할일이 완료되면(checkbox에 check하면) span에 done클래스를 추가한다
    if (todo.done) {
      span.classList.add("done");
    }
    // checkbox상태가 바뀌면, done클래스를 토글한다 (있으면 삭제, 없으면 추가)
    checkBox.addEventListener("change", () => {
      span.classList.toggle("done");
    });
    // left(div)에 checkBox와 span 넣어주기
    left.appendChild(checkBox);
    left.appendChild(span);

    // 삭제버튼
    const deletBtn = document.createElement("button");
    deletBtn.className = "delete-btn";
    deletBtn.textContent = "삭제";

    deleteBtn.addEventListener("click", () => {
      li;
    });
  });
}

/**
 * TODO(할일) 추가하기
 */
async function addTodo() {
  const text = todoInput.value.trim();
  //text의 내용이 비어있으면 "내용을 입력하세요"라고 경고 띄우기
  if (text === "") {
    return alert("내용을 입력하세요");
  }

  const response = await fetch("http://localhost:8080/todo/createTodo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: text }),
  });

  // 얻어온 결과를 콘솔에 호출하기
  const result = await response.json();
  console.log(result.data);

  todoInput.value = "";
  todoInput.focus();
}

// 할일 입력후 Enter키 누르면 todo 추가 이벤트
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

//추가 버튼에 이벤트 추가
addBtn.addEventListener("click", addTodo);
