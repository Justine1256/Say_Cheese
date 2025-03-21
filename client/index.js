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
 * Hiển thị danh sách sản phẩm
 */
const alllist = document.querySelector("#alllist");
/**
 * Hiển thị danh sách danh mục ở select
 */
const showCateListMenu = (data) => {
    const list = document.querySelectorAll(".menu-cate");
    list.forEach((item) => {
        data.forEach((element) => {
            const cate = `
            <li>
            <a href="shop.html?id=${element.id}">${element.name}</a>
            </li>
            `;
            item.innerHTML += cate;
        });
    });
};
/**
 * Lấy dữ liệu bảng danh mục từ API và chạy hàm showCateListMenu
 */
function getCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/category");
            const data = yield res.json();
            showCateListMenu(data);
        }
        catch (error) {
            console.log("Error fetching categories:", error);
        }
    });
}
/**
 * Lấy param id từ url
 */
const getProductId = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
const id = getProductId("id");
/**
 * Hiển thị chi tiết sản phẩm
 */
const container = document.querySelector(".product-details");
const showDetails = (data) => {
    let details = `
  <div>
      <img src="${data.images[0].url}" width="500" height="400" />
      <div class="detail-img">
        <a href="">
          <img src="../images/detail-img.jpg" width="100" height="100" />
        </a>
        <a href="">
          <img src="../images/detail-img2.jpg" width="100" height="100" />
        </a>
        <a href="">
          <img src="../images/detail-img3.jpg" width="100" height="100" />
        </a>
        <a href="">
          <img src="../images/detail-img4.jpg" width="100" height="100" />
        </a>
      </div>
    </div>
    <div class="details">
      <div>
        <h1>${data.name}</h1>
        <p class="">${data.category}</p>
        <div>
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
        </div>
        <p class="price">${data.price}</p>
        <p>${data.description}</p>
      </div>
      <div class="btn">
        <button>Mua ngay</button>
        <button class="cartBtn" onclick="addProductToCart(${data.id})">Thêm vào giỏ hàng</button>
      </div>
      <div class="prod-social">
        <a href="#" id="facebook">
          <img src="../images/facebook.png" width="13" height="13" />
          Like
        </a>
        <a href="#" id="twitter">
          <img src="../images/twitter.png" width="13" height="13" />
          Tweet
        </a>
        <a href="#" id="pinterest">
          <img src="../images/pinterest.png" width="13" height="13" />
          Save
        </a>
        <a href="#" id="instagram">
          <img src="../images/instagram.png" width="13" height="13" />
          Share
        </a>
        <a href="#" id="google-plus">
          <img src="../images/google-plus.png" width="16" height="16" />
          Share
        </a>
      </div>
    </div>
  `;
    container.innerHTML = details;
};
/**
 * Lấy dữ liệu chi tiết sản phẩm theo id
 */
function getProductsDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            console.log("Product ID is not available.");
            return;
        }
        try {
            const res = yield fetch(`http://localhost:3000/products/${id}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = yield res.json();
            showDetails(data);
        }
        catch (error) {
            console.log("Error fetching product details:", error);
        }
    });
}
getProductsDetails();
/**
 * Event listener for add to cart button
 */
const cartBtn = document.querySelectorAll(".cartBtn");
cartBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        console.log("GOT IT");
        event.preventDefault();
        const dataValue = btn.getAttribute("data");
        if (dataValue !== null) {
            addProductToCart(dataValue);
        }
        else {
            console.error("Data attribute 'data' is missing on the button.");
        }
    });
});
const retrieveCart = () => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
};
const storeCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};
/**
 * Get product's id and add it to the cart
 * @param id : product id
 */
const addProductToCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    try {
        let cart = retrieveCart();
        const res = yield fetch("http://localhost:3000/products");
        const productlist = yield res.json();
        var existingItem = cart.filter((item) => item.id == id);
        if (existingItem.length == 1) {
            cart.map((item) => {
                if (item.id == id) {
                    item.quantity++;
                }
            });
        }
        else {
            const product = productlist.filter((item) => item.id == id);
            const cartProduct = {
                id: ((_a = product[0]) === null || _a === void 0 ? void 0 : _a.id) || "",
                name: ((_b = product[0]) === null || _b === void 0 ? void 0 : _b.name) || "",
                price: ((_c = product[0]) === null || _c === void 0 ? void 0 : _c.price) || 0,
                description: ((_d = product[0]) === null || _d === void 0 ? void 0 : _d.description) || "",
                category: ((_e = product[0]) === null || _e === void 0 ? void 0 : _e.category) || "",
                images: ((_f = product[0]) === null || _f === void 0 ? void 0 : _f.images) || [],
                quantity: 1,
                stock: ((_g = product[0]) === null || _g === void 0 ? void 0 : _g.stock) || 0,
                likes: ((_h = product[0]) === null || _h === void 0 ? void 0 : _h.likes) || 0,
                tags: ((_j = product[0]) === null || _j === void 0 ? void 0 : _j.tags) || [],
                created_at: ((_k = product[0]) === null || _k === void 0 ? void 0 : _k.created_at) || "",
                ordered: ((_l = product[0]) === null || _l === void 0 ? void 0 : _l.ordered) || 0,
            };
            if (cartProduct) {
                cart.push(cartProduct);
            }
            else {
                throw new Error("Product not found");
            }
        }
        storeCart(cart);
        alert("Thêm vào giỏ hàng thành công!");
        // renderCart(cart);
    }
    catch (error) {
        alert("Lỗi khi thêm vào giỏ hàng:");
        console.error(error);
    }
});
