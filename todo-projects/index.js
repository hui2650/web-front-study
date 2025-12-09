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

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

addBtn.addEventListener("click", addTodo);
