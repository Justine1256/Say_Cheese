var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var alllistShop = document.querySelector("#alllist");
console.log(alllistShop);
var currentPage = 1;
var productsPerPage = 9;
var products = [];
// Pagination buttons
var beginPageBtn = document.getElementById("begin-btn");
var previousPageBtn = document.getElementById("previous-btn");
var nextPageBtn = document.getElementById("next-btn");
var endPageBtn = document.getElementById("end-btn");
// Event listeners for pagination buttons
if (previousPageBtn) {
    previousPageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            showShopList(products);
        }
    });
}
if (nextPageBtn) {
    nextPageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var totalPages = Math.ceil(products.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showShopList(products);
        }
    });
}
if (beginPageBtn) {
    beginPageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage = 1;
            showShopList(products);
        }
    });
}
if (endPageBtn) {
    endPageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var totalPages = Math.ceil(products.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage = totalPages;
            showShopList(products);
        }
    });
}
/**
 * Function to call API and show products
 */
function APIGetProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/products")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    products = data; // Store fetched products for pagination
                    showShopList(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log("Error fetching products:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
APIGetProducts();
function updatePaginationProd(data) {
    var pagination = document.getElementById("product-pagination");
    if (pagination) {
        var pageButtons = pagination.getElementsByTagName("a");
        if (currentPage === 1) {
            pageButtons[0].classList.add("disabled");
            pageButtons[1].classList.add("disabled");
        }
        else {
            pageButtons[0].classList.remove("disabled");
            pageButtons[1].classList.remove("disabled");
        }
        for (var i = 2; i < pageButtons.length - 1; i++) {
            if (i === currentPage) {
                pageButtons[i].classList.add("active");
            }
            else {
                pageButtons[i].classList.remove("active");
            }
        }
        var totalPages = Math.ceil(data.length / productsPerPage);
        if (currentPage === totalPages) {
            pageButtons[pageButtons.length - 1].classList.add("disabled");
        }
        else {
            pageButtons[pageButtons.length - 1].classList.remove("disabled");
        }
    }
    else {
        console.log("Không tìm thấy element #product-pagination");
    }
}
/**
 * Show the list of products
 */
var showShopList = function (data) {
    var startIndex = (currentPage - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage;
    var pageProducts = data.slice(startIndex, endIndex);
    var productCountElement = document.getElementById("product-count");
    if (productCountElement) {
        productCountElement.textContent = "Showing ".concat(startIndex + 1, " to ").concat(endIndex, " of ").concat(data.length, " results");
    }
    if (!alllistShop)
        return;
    var startIndex = (currentPage - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage;
    var pageProducts = data.slice(startIndex, endIndex);
    alllistShop.innerHTML = pageProducts
        .map(function (element) { return "<div class=\"product\">\n        <a href=\"product-details.html?id=".concat(element.id, "\">\n          <div class=\"overflow-hidden\">\n            <img src=\"").concat(element.images[0].url, "\" alt=\"\" />\n            <img class=\"tag\" src=\"../images/hot.png\" alt=\"\" />\n          </div>\n          <a href=\"#\">").concat(element.name, "</a>\n          <a class=\"category-link\" href=\"\">").concat(element.category, "</a>\n          <p>").concat(element.price, "\u0111</p>\n          <button class=\"cartBtn\" data=\"").concat(element.id, "\">Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng</button>\n        </a>\n      </div>"); })
        .join("");
    // Update product count and pagination
    if (productCountElement) {
        productCountElement.textContent = "Showing ".concat(startIndex + 1, " to ").concat(endIndex, " of ").concat(data.length, " results");
    }
    updatePaginationProd(data);
};
/**
 * Lọc sản phẩm theo danh mục
 */
var getCateId = function (param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
if (getCateId("id") != null) {
    console.log(getCateId("id"));
    // addToCart(parseInt(id));
    /**
     * Lấy dữ liệu bảng sản phẩm từ API
     */
    function getFilteredProducts(id) {
        return __awaiter(this, void 0, void 0, function () {
            var cate_res, cate_data, category, res, data, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch("http://localhost:3000/category")];
                    case 1:
                        cate_res = _b.sent();
                        return [4 /*yield*/, cate_res.json()];
                    case 2:
                        cate_data = _b.sent();
                        category = (_a = cate_data.find(function (c) { return c.id === id; })) === null || _a === void 0 ? void 0 : _a.name;
                        return [4 /*yield*/, fetch("http://localhost:3000/products?cate_id=" + category)];
                    case 3:
                        res = _b.sent();
                        return [4 /*yield*/, res.json()];
                    case 4:
                        data = _b.sent();
                        showShopList(data);
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _b.sent();
                        console.log("Error fetching categories:", error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    getFilteredProducts(parseInt((_a = getCateId("id")) !== null && _a !== void 0 ? _a : "0")); // Use null coalescing operator to provide a default value
}
// /**
//  * Hiển thị sản phẩm trong giỏ hàng
//  */
// var showCart = async (cart: any[]) => {
//   const cartBody = document.getElementById("cart-body") as HTMLElement;
//   cart.forEach((item) => {
//     const cartItem = `<tr>
//       <td class="product-remove">
//         <button class="delete-cart" data="${item.id}">
//           <img src="../IMG/trash-bin.png"/>
//         </button>
//       </td>
//       <td class="product-thumb">
//         <a href="product-details.html">
//           <img src="${item.img}" alt="${item.name}" />
//         </a>
//       </td>
//       <td class="product-name">
//         <a href="product-details.html?id=${item.id}">${item.name}</a>
//       </td>
//       <td class="product-price">${item.price}</td>
//       <td class="product-quantity">
//         <input
//           type="number"
//           name="quantity"
//           id="quantity-${item.id}"
//           value="${item.quantity}"
//           min="1"
//           max="100"
//           onchange="updateProductTotal(${item.id})"
//         />
//       </td>
//       <td id="product-total-${item.id}"></td>
//     </tr>`;
//     cartBody.insertAdjacentHTML("beforeend", cartItem);
//   });
//   const deleteCartBtn = document.querySelectorAll(".delete-cart");
//   deleteCartBtn.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//       event.preventDefault();
//       // Get the data attribute value
//       const dataValue = btn.getAttribute("data");
//       // Check if dataValue is not null before parsing
//       if (dataValue !== null) {
//         deleteCart(parseInt(dataValue));
//       } else {
//         console.error("Data attribute 'data' is missing on the button.");
//       }
//     });
//   });
//   const cartBtn = document.querySelectorAll(".cartBtn");
//   cartBtn.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//       event.preventDefault();
//       // Get data attribute value
//       const dataValue = btn.getAttribute("data");
//       // Check if dataValue is not null before parsing
//       if (dataValue !== null) {
//         addToCart(parseInt(dataValue));
//       } else {
//         console.error("Data attribute 'data' is missing on the button.");
//       }
//     });
//   });
// };
// /**
//  * Thêm vào giỏ hàng
//  */
// const addToCart = async (i: number) => {
//   try {
//     const res = await fetch("http://localhost:3000/products/" + i);
//     const data = await res.json();
//     const selectProduct = data;
//     const product: any = {
//       id: selectProduct.id,
//       name: selectProduct.name,
//       cate_id: selectProduct.cate_id,
//       img: selectProduct.img,
//       price: selectProduct.price,
//       quantity: 1,
//     };
//     fetch("http://localhost:3000/cart/", {
//       headers: {
//         "content-type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify(product),
//     })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     alert("Thêm vào giỏ hàng thành công");
//   } catch (error) {
//     console.log(error);
//   }
// };
// /**
//  * Xóa sản phẩm trong giỏ hàng
//  */
// const deleteCart = async (id: number) => {
//   if (confirm("Bạn có chắc chắn muốn xóa?")) {
//     fetch("http://localhost:3000/cart/" + id, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "DELETE",
//     })
//       .then((res) => console.log(res))
//       .catch((error) => console.log(error));
//   }
// };
// /**
//  * Update số lượng sản phẩm và giá
//  */
// const updateProductTotal = async (id: number) => {
//   const res = await fetch("http://localhost:3000/cart/" + id);
//   const data = await res.json();
//   const selectProduct = data;
//   const quantity = parseInt(
//     (document.getElementById(`quantity-${id}`) as HTMLInputElement).value
//   );
//   selectProduct.quantity = quantity;
//   fetch("http://localhost:3000/cart/" + id, {
//     headers: {
//       "content-type": "application/json",
//     },
//     method: "PATCH",
//     body: JSON.stringify(selectProduct),
//   })
//     .then((res) => console.log(res))
//     .catch((error) => console.log(error));
// };
// /**
//  * Hiển thị danh sách danh mục ở select
//  */
// const showCateListMenu = (data: any[]) => {
//   const list = document.querySelectorAll(".menu-cate");
//   list.forEach((item) => {
//     data.forEach((element) => {
//       const cate = `
//           <li>
//           <a href="shop.html?id=${element.id}">${element.name}</a>
//           </li>
//           `;
//       item.innerHTML += cate;
//     });
//   });
// };
// async function getCategoriesList(showCateList: any) {
//   try {
//     const res = await fetch("http://localhost:3000/category");
//     const data = await res.json();
//     showCateListMenu(data);
//     return data;
//   } catch (error) {
//     console.log("Error fetching categories:", error);
//   }
// }
