// 서버의 주소와 포트를 명시한다
export const BASE_URL = "http://localhost:8080";

// 범용 api fetch 함수 응답상태 확인하고 json 데이터를 파싱하여 반환
export async function apiFetch(endpoint, options) {
  const url = BASE_URL + endpoint;
  try {
    // fetch 요청을 한다
    const response = await fetch(url, options);
    // 응답본문을 json으로 파싱
    const result = await response.json();

    if (!response.ok) {
      // ResponseDTO의 error 필드에 담긴 메세지를 꺼낸다
      const errorMessage = result.error;
      // 통신이 잘 되지 않으면 예외를 발생시킨다
      throw new Error(errorMessage);
    }
    // 성공 시 응답 DTO data 필드를 반환
    return result.data;
  } catch (error) {
    console.log("API 호출 중 오류 발생 : " + error.message);
    throw error;
  }
}
