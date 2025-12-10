/**
 * TODO(할일) 추가하기
 */
export async function addTodoAPI(title) {
  const response = await fetch("http://localhost:8080/todo/createTodo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  // 얻어온 결과
  const result = await response.json();
  return result;
}
/**
 * TODO(할일) 수정하기
 */
export async function updatedTodoAPI(todo) {
  const response = await fetch(`http://localhost:8080/todo/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: todo.title,
      done: todo.done,
    }),
  });

  const result = await response.json();
  return result;
}
/**
 * TODO(할일) 삭제하기
 */
export async function deleteTodoAPI(id) {
  const response = await fetch(`http://localhost:8080/todo/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
}
/**
 * 새로고침시 TODO(할일) 불러오기
 */
export async function loadTodosAPI() {
  const response = await fetch("http://localhost:8080/todo/retrieve");
  const result = await response.json();
  return result;
}
