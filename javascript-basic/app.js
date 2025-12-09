// jsonplaceholder을 이용한 CRUD
const API = "https://jsonplaceholder.typicode.com/posts";
//HTML에서 요소를 미리 가져온다.

//게시글 목록이 렌더링 될 ul 이다
const postsEl = document.querySelector("#posts");
//글 작성/수정에 사용하는 form 태그
const form = document.querySelector("#postForm");
// 제목을 입력하는 input태그
const titleInput = document.querySelector("#title");
//내용을 입력하는 input태그
const bodyInput = document.querySelector("#body");
//작성 버튼
const submitBtn = document.querySelector("#submitBtn");
//수정모드일때만 사용되는 hidden input
const postIdInput = document.querySelector("#postId");
//수정 취소 버튼
const cancelBtn = document.querySelector("#cancelBtn");
//새로고침 버튼
const refreshBtn = document.querySelector("#refreshBtn");
//더보기 버튼
const loadMoreBtn = document.querySelector("#loadMoreBtn");
// 목록 로딩 시 보여줄 로딩UI (스피너)
const listLoader = document.querySelector("#listLoader");
//폼로더?
const formLoader = document.querySelector("#formLoader");

//현재 로드할 페이지 번호. 초기값 1
let page = 1;
// 한 번에 가져올 게시글 수. 기본 10.
const LIMIT = 10;
// 네트워크 중복 방지 플래그. 요청 시작시 true, 끝나면 false
let loading = false;

//setLaading
//간단한 로더 표시 토글 함수
//실제로는 hidden 클래스를 제거/추가해 요소를 보이거나 숨긴다.

//el : 로딩 요소
//on : 로딩 여부
function setLoading(el, on) {
  if (on) el.classList.remove("hidden");
  else el.classList.add("hidden");
}

//escapeHtml
//서버에서 받은 텍스트(title, body)를 HTML 이스케이프해서 XSS/깨짐 방지
//renderPosts 에서 리스트 아이템 HTML 만들때 호출됨
function escapeHtml(s) {
  return s
    ? String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
    : "";
}

//fetchPosts
// 현재 page 기준으로 게시글 목록을 가져와 화면에 렌더. 페이징을 진행.

//게시물 목록을 불러와 렌더링한다!
//로딩중이면 중복 호출을 막고, 에러 발생 시 사용자에게 알린다.
//성공하면 renderPosts에 데이터를 넘긴다.
async function fetchPosts() {
  if (loading) return; //loading이면 조기 리턴(중복방지)
  loading = true;
  setLoading(listLoader, true);
  try {
    const res = await fetch(`${API}?_page=${page}&_limit=${LIMIT}`);
    //응답 OK면 renderPosts(data) 호출 후 page++;
    if (!res.ok) throw new Error("목록 불러오기 실패");
    const data = await res.json();
    renderPosts(data);
    page++;
    //실패 시 에러 메세지
  } catch (err) {
    console.error(err);
    alert("목록을 불러오는 중 오류가 발생했다");
  } finally {
    //최종적으로 loading = false
    loading = false;
    setLoading(listLoader, false);
  }
}

//renderPosts
//전달받은 게시글 배열을 <ul id="posts">에 붙여서 보여줌
//fetchPosts()성공 시 호출됨
function renderPosts(items) {
  if (page === 1) postsEl.innerHTML = ""; //초기 로드거나 새로고침일 때 기존 목록 비우기
  if (items.length === 0) {
    // items.length===0 이면 '더이상 없음' 메세지 표시하고 더보기 버튼 비활성화
    postsEl.insertAdjacentHTML(
      //ul 태그에 소괄호에 있는 내용을 삽입해라
      //beforeend : 선택한 요소 안쪽에서 맨 뒤
      "beforeend",
      `<li class="item"><div class="meta muted">더 이상 게시물이 없습니다</div></li>`
    );
    //더보기 버튼 비활성화
    loadMoreBtn.disabled = true;
    return;
  }
  //아이템이 있으면: 각 게시글에 대한 <li> 생성 → innerHTML 구성(escape 포함)
  for (const p of items) {
    // li 요소 생성
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
      <div style="width:36px;height:36px;border-radius:6px;background:#eef8ff;display:flex;align-items:center;justify-content:center;color:var(--accent);font-weight:700">${
        p.id
      }</div>
      <div style="flex:1">
        <div class="meta">작성자: ${p.userId} · ID: ${p.id}</div>
        <div class="title">${escapeHtml(p.title)}</div>
        <div class="body" style="white-space:pre-wrap">${escapeHtml(
          p.body
        )}</div>
      </div>
      <div class="actions">
        <button data-id="${p.id}" class="editBtn muted">수정</button>
        <button data-id="${
          p.id
        }" class="delBtn" style="background:#fee2e2;color:#7f1d1d">삭제</button>
      </div>
    `;
    postsEl.appendChild(li);
    // appendChild로 li를 넣어줌
  }
  // 이벤트 위임보다 간단히 버튼 바인딩
  document.querySelectorAll(".editBtn").forEach((b) => (b.onclick = onEdit));
  document.querySelectorAll(".delBtn").forEach((b) => (b.onclick = onDelete));
}

// 작성/수정
//사용자가 폼에서 '작성/수정'버튼을 눌렀을 때
form.addEventListener("submit", async (e) => {
  //새로고침 방지
  e.preventDefault();
  const id = postIdInput.value;
  const payload = {
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
    userId: 1,
  };
  if (!payload.title || !payload.body) {
    alert("제목과 내용을 입력하세요");
    return;
  }

  try {
    setLoading(formLoader, true);
    submitBtn.disabled = true;
    // postIdInput.value가 있으면 수정(PUT)
    if (id) {
      // 수정
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("수정 실패");
      alert("수정 응답을 받았다 (테스트 API는 실제로 저장하지 않음)");
      // 간단하게 목록 다시 로드 
      page = 1;
      postsEl.innerHTML = "";
      await fetchPosts();
      resetForm();
      //postIdInput.value가 없으면 생성(POST)
    } else {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("작성 실패");
      const data = await res.json();
      //요청 성공시 alert로 결과 안내
      alert("작성 완료, 생성 ID: " + data.id);
      //목록 재로딩 !
      page = 1;
      postsEl.innerHTML = "";
      await fetchPosts();
      // resetForm()으로 폼 상태 초기화
      resetForm();
    }
  } catch (err) {
    console.error(err);
    alert("요청 중 오류가 발생했다");
  } finally {
    // finally에서 로더 OFF, 버튼 활성화
    setLoading(formLoader, false);
    submitBtn.disabled = false;
  }
});

// resetForm
//폼을 작성모드 초기상태로 되돌림
//작성/수정 완료 후 또는 취소 버튼 클릭시 호출됨
function resetForm() {
  postIdInput.value = "";
  titleInput.value = "";
  bodyInput.value = ""; //다비움
  submitBtn.textContent = "작성"; //제출 버튼 텍스트를 작성으로 되돌림
  //취소 버튼 숨김
  cancelBtn.classList.add("hidden");
}

//onEdit
//수정 버튼 클릭시 해당 글의 데이터를 가져와 폼에 채우고 수정모드로 전환
//각 학몽의 editBtn 클릭될 때마다 호출됨

async function onEdit(e) {
  // data-id에서 글 읽기
  const id = e.currentTarget.dataset.id;
  try {
    //로더 ON
    setLoading(formLoader, true);
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error("불러오기 실패");
    //응답 OK면 폼에 값 채우고, 제출 버튼 텍스트를 “수정”으로 변경, “취소” 버튼 표시
    const p = await res.json();
    postIdInput.value = p.id;
    titleInput.value = p.title;
    bodyInput.value = p.body;
    submitBtn.textContent = "수정";
    cancelBtn.classList.remove("hidden");
    //화면 상단으로 스크롤(수정폼 바로 보이게)
    window.scrollTo({ top: 0, behavior: "smooth" });
    //에러시 안내
  } catch (err) {
    console.error(err);
    alert("게시글을 불러오는 중 오류");
    //로더 OFF
  } finally {
    setLoading(formLoader, false);
  }
}

//onDelete
//삭제 버튼 클릭시 서버에 삭제 요청을 보내고 목록을 갱신
//각 항목의 delBtn 클릭 시 호출됨
async function onDelete(e) {
  const id = e.currentTarget.dataset.id;
  if (!confirm("정말 삭제하시겠습니까?")) return;
  try {
    setLoading(listLoader, true);
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("삭제 실패");
    alert("삭제 요청 전송됨 (테스트 API는 실제 삭제를 수행하지 않음)");
    page = 1;
    postsEl.innerHTML = "";
    await fetchPosts();
  } catch (err) {
    console.error(err);
    alert("삭제 중 오류가 발생했다");
  } finally {
    setLoading(listLoader, false);
  }
}

cancelBtn.addEventListener("click", resetForm);
refreshBtn.addEventListener("click", () => {
  page = 1;
  postsEl.innerHTML = "";
  fetchPosts();
});
loadMoreBtn.addEventListener("click", fetchPosts);

// 초기 로드
fetchPosts();
