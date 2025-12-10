import {
  addTodoAPI,
  updatedTodoAPI,
  deleteTodoAPI,
  loadTodosAPI,
} from "./api.js";

import { renderTodoList } from "./render.js";

// 할일 입력창
const todoInput = document.querySelector("#todo-input");
//추가버튼
const addBtn = document.querySelector(".add-btn");

// ---------------------
// 공통 렌더 함수
// ---------------------
function rerender(result) {
  renderTodoList(result.data, {
    onUpdate: async (todo) => {
      const res = await updatedTodoAPI(todo);
      rerender(res);
    },
    onDelete: async (id) => {
      const res = await deleteTodoAPI(id);
      rerender(res);
    },
  });
}

// ---------------------
// 초기 로드
// ---------------------
document.addEventListener("DOMContentLoaded", async () => {
  const result = await loadTodosAPI();
  rerender(result);
});

// ---------------------
// todo 추가
// ---------------------
async function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return alert("내용을 입력하세요");

  const result = await addTodoAPI(text);
  rerender(result);

  todoInput.value = "";
  todoInput.focus();
}

// 할일 입력후 Enter키 누르면 todo 추가 이벤트
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

//추가 버튼에 TODO추가 이벤트
addBtn.addEventListener("click", addTodo);
