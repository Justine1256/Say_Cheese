"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Biến đổi kiểu date "dd/mm/yyyy" thành kiểu Date Object
 */
function parseDatee(date) {
    const [day, month, year] = date.split("/").map(Number);
    return new Date(year, month - 1, day);
}
/**
 * Filter egg waffles/milk/tea
 */
function threeColsFilter() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/products");
            const data = yield res.json();
            const sua_beo_container = document.getElementById("sua-beo");
            const banh_trung_container = document.getElementById("banh_trung");
            const tra_thom_container = document.getElementById("tra_thom");
            //Sắp xếp mảng sp theo "created_at"
            const sortedData = data.sort((a, b) => {
                const aDate = new Date(parseDatee(a.created_at));
                const bDate = new Date(parseDatee(b.created_at));
                return bDate.getTime() - aDate.getTime();
            });
            // Sữa béo
            let sua_beo = sortedData.filter((item) => {
                if (item.category == "Say Cheese THƠM BÉO" ||
                    item.category == "Say Cheese ĐẬM VỊ") {
                    return item;
                }
            });
            sua_beo.splice(3);
            sua_beo.forEach((element) => {
                const prod = `
      <a href="product-details.html?id=${element.id}">
      <div class="best-prod" role="article">
      <div class="product">
        <div class="overflow-hidden">
          <img src="${element.images[0].url}" alt="${element.images[0].alt}" />
          <img class="tag" src="../images/hot.png" alt="Hot product tag" />
        </div>
        <div class="bst-prod-content">
          <a href="product-details.html?id=${element.id}">${element.name}</a>
           <a class="category-link" href="">${element.category}</a>
           <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" data="${element.id}"><i class="bi bi-cart-fill"></i></button>
           </div>
         </div>
        </div>
      </div>
       </a>
      `;
                sua_beo_container.innerHTML += prod;
            });
            // Bánh Trứng
            let banh_trung = sortedData.filter((item) => {
                if (item.category == "Bánh Trứng Gà Non HongKong") {
                    return item;
                }
            });
            banh_trung.splice(3);
            banh_trung.forEach((element) => {
                const prod = `
      <a href="product-details.html?id=${element.id}">
      <div class="best-prod" role="article">
      <div class="product">
        <div class="overflow-hidden">
          <img src="${element.images[0].url}" alt="${element.images[0].alt}" />
          <img class="tag" src="../images/hot.png" alt="Hot product tag" />
        </div>
        <div class="bst-prod-content">
          <a href="product-details.html?id=${element.id}">${element.name}</a>
           <a class="category-link" href="">${element.category}</a>
                      <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" data="${element.id}"><i class="bi bi-cart-fill"></i></button>
           </div>
         </div>
        </div>
      </div>
         </a>
      `;
                banh_trung_container.innerHTML += prod;
            });
            // Trà thơm
            let tra_thom = sortedData.filter((item) => {
                if (item.category == "Say Cheese THANH MÁT") {
                    return item;
                }
            });
            tra_thom.splice(3);
            tra_thom.forEach((element) => {
                const prod = `
        <a href="product-details.html?id=${element.id}">
    <div class="best-prod" role="article">
      <div class="product">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="${element.images[0].alt}" />
            <img class="tag" src="../images/hot.png" alt="Hot product tag" />
          </div>
          <div class="bst-prod-content">
            <a href="product-details.html?id=${element.id}">${element.name}</a>
            <a class="category-link" href="">${element.category}</a>
            <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" data="${element.id}"><i class="bi bi-cart-fill"></i></button>
          </div>
         </div>
      </div>
    </div>
        </a>`;
                tra_thom_container.innerHTML += prod;
            });
            console.log(sua_beo);
        }
        catch (error) {
            console.log("Error fetching categories:", error);
        }
    });
}
/**
 * Fetch most liked products
 */
function fetchMostlikesProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/products");
            const data = yield res.json();
            const mostlikesContainer = document.getElementById("alllist");
            const sortedData = data.sort((a, b) => b.likes - a.likes);
            console.log(sortedData);
            sortedData.slice(0, 5).forEach((element) => {
                const prod = `
      <a href="product-details.html?id=${element.id}">
        <div class="product" role="article">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="${element.images[0].alt}" />
          </div>
          <a href="product-details.html?id=${element.id}">${element.name}</a>
          <a class="category-link" href="">${element.category}</a>
          <p>${element.price}đ</p>
          <button class="cartBtn" data="${element.id}">Thêm vào giỏ hàng</button>
        </div>
      </a>
`;
                mostlikesContainer.innerHTML += prod;
            });
        }
        catch (error) {
            console.log("Error fetching most likes products:", error);
        }
    });
}
/**
 * Fetch most ordered products
 */
function fetchBestSellingProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/products");
            const data = yield res.json();
            const bestSellersContainer = document.querySelector(".best-prod-list");
            const sortedData = data.sort((a, b) => b.ordered - a.ordered);
            sortedData.slice(0, 6).forEach((element) => {
                const prod = `<div class="best-prod" role="article">
        <div class="product">
        <a href="product-details.html?id=${element.id}">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="${element.images[0].alt}" />
            <img class="tag" src="../images/hot.png" alt="Hot product tag" />
          </div>
          <div class="bst-prod-content">
            <a href="">${element.name}</a>
            <a class="category-link" href="">${element.category}</a>
           <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" data="${element.id}"><i class="bi bi-cart-fill"></i></button>
           </div>
          </div>
          </a>
        </div>
      </div>`;
                bestSellersContainer.innerHTML += prod;
            });
        }
        catch (error) {
            console.log("Error fetching best selling products:", error);
        }
    });
}
threeColsFilter();
fetchMostlikesProducts();
fetchBestSellingProducts();
