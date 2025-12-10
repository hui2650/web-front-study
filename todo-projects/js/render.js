// li.todo-item를 담을 ul.todo-list
const todoList = document.querySelector(".todo-list");
// 비어있는 텍스트
const emptyText = document.querySelector(".empty-text");

/**
 * TODO(할일) 렌더링하기
 */
export function renderTodoList(todos, { onUpdate, onDelete }) {
  //todos = result.data 그 자체!
  // 기존에 있던 모든 요소 li 제거 (재랜더링)
  todoList.innerHTML = "";

  // todos가 아니거나 없으면 "아직 등록된 할일이 없습니다" text 보이기
  if (!todos || todos.length === 0) {
    emptyText.style.display = "block";
    return;
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

      // 상태 변경 후 서버에 업데이트 요청
      onUpdate({
        id: todo.id,
        title: todo.title,
        done: checkBox.checked,
      });
    });

    //span을 더블클릭했을때 수정모드로 바뀜
    span.addEventListener("dblclick", () => {
      const originalText = span.textContent;

      //span을 임시 input요소로 교체
      const input = document.createElement("input");
      input.type = "text";
      input.value = originalText;
      input.classList.add("todo-input-edit");

      //span -> input 교체
      span.parentNode.replaceChild(input, span);
      input.focus();

      // 저장 함수
      const saveChanges = async () => {
        const newText = input.value.trim();

        //텍스트가 비어있지 않고, 기존과 다를 경우만 서버에 요청
        if (newText !== "" && newText !== originalText) {
          onUpdate({
            id: todo.id,
            title: newText,
            done: todo.done, // true/falsedatedTodo = {
          });
          span.textContent = newText; // 화면 텍스트도 갱신
        }
        //입력필드를 다시 input -> span 교체
        input.parentNode.replaceChild(span, input);
      };

      // input에서 enter키를 눌렀을 때 saveChanges() 실행
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          saveChanges();
        }
      });
    });

    // left(div)에 checkBox와 span 넣어주기
    left.appendChild(checkBox);
    left.appendChild(span);

    // 삭제버튼
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "삭제";

    // 삭제버튼 클릭시 onDelete 호출
    deleteBtn.addEventListener("click", () => {
      onDelete(todo.id);
    });
    li.appendChild(left);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}
