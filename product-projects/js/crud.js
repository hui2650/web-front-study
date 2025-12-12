const productName = document.querySelector("#product-name");
const productStock = document.querySelector("#product-stock");
const productPrice = document.querySelector("#product-price");

const productTableBody = document.querySelector(".product-table-body");
const orderTableBody = document.querySelector(".order-table-body");
const productMessage = document.querySelector("#product-message");
const orderMessage = document.querySelector("#order-message");
// 상품 목록을 조회하는 fetchProduct 함수
export async function fetchProduct(apiFetch) {
  // tbody의 <td>에 상품 목록을 로딩중...
  productTableBody.innerHTML =
    '<tr><td colspan="8"> 상품 목록을 로딩중... </td></tr>';
  try {
    const options = {
      method: "GET",
    };
    //apiFecth() 함수를 이용하여 서버에 요청하고 데이터를 반환받는다
    const data = await apiFetch("/product", options);
    console.log(data);

    renderProductTable(data);
  } catch (error) {
    // apiFetch에서 발생한 에러를 여기서 처리
    productTableBody.innerHTML =
      '<tr><td colspan="8"> 에러가 발생하여 상품 목록을 불러올 수 없습니다.</td></tr>';
    console.log(error.message);
  }
}

// 상품 목록을 테이블에 랜더링하는 renderProductTable함수
function renderProductTable(data) {
  // 상품이 없을 경우
  if (data.length == 0) {
    productTableBody.innerHTML =
      '<tr><td colspan="8"> 아직 등록된 상품이 없습니다.</td></tr>';
    return;
  }

  // 배열(data)을  HTML <tr> 목록으로 변환해 테이블에 렌더링!
  const rows = data
    .reverse() // 가장 최근 업데이트된 상품 기준으로 정렬
    .map(
      (product) =>
        `
        <tr>
           <td>
            <input 
              type="radio" 
              name="selectedProduct" 
              value="${product.name}"
            />
          </td>
          <td>
            <input
              type="number"
              min="1"
              id="orderCount-${product.id}"
              class="order-count-input"
              placeholder="개수"
              disabled
              style="width:60px;"
            />
          </td>
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
    await apiFetch("/product", options);

    // 상품 추가 후 재렌더링
    await fetchProduct(apiFetch);

    productMessage.innerHTML = `상품 '${dtos.name}'가(이) 추가되었습니다.`;
    productMessage.style.color = "rgb(66, 190, 66)";

    //인풋 초기화
    productName.value = "";
    productStock.value = "";
    productPrice.value = "";
  } catch (error) {
    console.log(error.message);
    productMessage.innerHTML = `상품 추가에 실패하였습니다.`;
    productMessage.style.color = "red";
  }
}

// 주문 내역을 조회하는 fetchOrders 함수
export async function fetchOrders(apiFetch) {
  try {
    const data = await apiFetch("/orders");
    renderOrderTable(data);
  } catch (error) {
    orderTableBody.innerHTML =
      '<tr><td colspan="8"> 에러가 발생하여 주문 내역을 불러올 수 없습니다.</td></tr>';
    orderMessage.innerHTML = "에러가 발생하였습니다";
    orderMessage.style.color = "red";
    console.log(error.message);
  }
}

// 주문 내역을 렌더링하는 함수
function renderOrderTable(data) {
  // 주문 내역이 없을 경우
  if (data.length === 0) {
    orderMessage.innerHTML = "등록된 주문 내역이 없습니다.";
    orderMessage.style.color = "#424fff";
    orderTableBody.innerHTML =
      '<tr><td colspan="6"> 등록된 주문이 없습니다.</td></tr>';
    return;
  }
  // 최신 주문 내역이 위로 오도록 데이터를 추가
  const rows = data
    .reverse()
    .map(
      (orders) =>
        `
      <tr>
        <td>${orders.productName}</td>
        <td>${orders.productPrice}</td>
        <td>${orders.productCount}</td>
        <td>${orders.totalPrice}</td>
        <td>${orders.orderDate}</td>
      </tr>
      `
    )
    .join("");
  orderTableBody.innerHTML = rows;
  orderMessage.innerHTML = `총 ${data.length}건의 주문 내역이 조회되었습니다.`;
  orderMessage.style.color = rgb(66, 190, 66);
}
