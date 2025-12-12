import { apiFetch } from "./api.js";
import { fetchProduct, addProduct, fetchOrders, OrderProduct } from "./crud.js";

const addBtn = document.querySelector(".add-btn");
const fetchOrderBtn = document.querySelector("#fetch-order-btn");
const orderBtn = document.querySelector("#order-btn");

// 초기화 함수
document.addEventListener("DOMContentLoaded", () => {
  // 목록조회
  fetchProduct(apiFetch);
});

addBtn.addEventListener("mouseover", () => {
  addBtn.style.background = "rgb(31, 163, 31)";
});
addBtn.addEventListener("mouseleave", () => {
  addBtn.style.background = "rgb(66, 190, 66)";
});
addBtn.addEventListener("click", () => {
  // 상품추가
  addProduct(apiFetch);
});
fetchOrderBtn.addEventListener("click", () => {
  // 주문내역
  fetchOrders(apiFetch);
});
orderBtn.addEventListener("click", () => {
  OrderProduct(apiFetch);
});
