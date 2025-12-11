const API = "https://dog.ceo/api/breeds/image/random";

const img = document.querySelector("#img");
const btn = document.querySelector("#btn");

async function loadDog() {
  //   btn.disabled = true;
  try {
    //fetch로 강아지 API에 요청
    const res = await fetch(API);
    // HTTP 상태 확인
    if (!res.ok) throw new Error("응답 오류");
    //서버에서 받은 JSON 데이터(이미지주소)를 꺼냄 (응답을 js객체로 파싱)
    const data = await res.json();
    //img태그의 src를 새 이미지로 바꿔서 표기
    img.src = data.message;
  } catch (e) {
    //에러나면 콘솔에 표시하고 alt문구 출력
    console.log(e);
    img.alt = "이미지를 불러오지 못했습니다";
  } finally {
    // btn.disabled = false;
  }
}

btn.addEventListener("click", loadDog);

loadDog();
