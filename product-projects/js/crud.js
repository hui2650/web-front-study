const productName = document.querySelector("#product-name");
const productStock = document.querySelector("#product-stock");
const productPrice = document.querySelector("#product-price");

const productTableBody = document.querySelector(".product-table-body");

// 상품 목록을 조회하는 fetchProduct 함수
export async function fetchProduct(apiFetch) {
  // tbody의 <td>에 상품 목록을 로딩중...
  productTableBody.innerHTML =
    '<tr><td colspan="6" class="product-table-body"> 상품 목록을 로딩중... </td></tr>';
  try {
    //apiFecth() 함수를 이용하여 서버에 요청하고 데이터를 반환받는다
    const data = await apiFetch("/read");
    console.log(data);

    // 배열(data)을  HTML <tr> 목록으로 변환해 테이블에 렌더링!
    const rows = data
      .reverse() // 가장 최근 업데이트된 상품 기준으로 정렬
      .map(
        (product) =>
          `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.stock}</td>
          <td>${product.price}</td>
          <td>${product.registerTime}</td>
          <td>${product.updateTime}</td>
        </tr>
        `
      )
      .join(""); //문자열로 변환 필수

    // tbody 안에 넣어주기
    productTableBody.innerHTML = rows;

    // 상품이 없을 경우
    if (data.length == 0) {
      productTableBody.innerHTML =
        '<tr><td colspan="6" class="product-table-body"> 아직 등록된 상품이 없습니다.</td></tr>';
    }
  } catch (error) {
    // apiFetch에서 발생한 에러를 여기서 처리
    productTableBody.innerHTML =
      '<tr><td colspan="6" class="product-table-body"> 에러가 발생하여 상품 목록을 불러올 수 없습니다.</td></tr>';
    console.log(error.message);
  }
}
// 상품을 추가하는 addProduct 함수
export async function addProduct(apiFetch) {
  try {
    const dtos = {
      name: productName.value.trim(),
      stock: productStock.value,
      price: productPrice.value,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtos),
    };
    // apiFetch 호출
    await apiFetch("/create", options);

    // 상품 추가 후 재렌더링
    await fetchProduct(apiFetch);

    //인풋 초기화
    productName.value = "";
    productStock.value = "";
    productPrice.value = "";
  } catch (error) {
    console.log(error.message);
  }
}
