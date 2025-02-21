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
var products = [];
// Number of products per page
var productsPerPage = 10;
// Current page
var currentPage = 1;
// Pagination buttons
var beginPageBtn = document.getElementById("begin-btn");
var previousPageBtn = document.getElementById("previous-btn");
var nextPageBtn = document.getElementById("next-btn");
var endPageBtn = document.getElementById("end-btn");
/**
 * Function to display products on the page
 * @param data
 */
function showBestSeller(data) {
    var productList = document.getElementById("best-seller");
    if (!productList)
        return;
    productList.innerHTML = "";
    //Sắp xếp mảng sp theo "ordered"
    var sortedData = data.sort(function (a, b) {
        return b.ordered - a.ordered;
    });
    var startIndex = (currentPage - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage;
    var pageProducts = sortedData.slice(startIndex, endIndex);
    pageProducts.forEach(function (product) {
        var row = document.createElement("tr");
        row.innerHTML = "\n      <tr>\n                <td>\n                  <div class=\"row-thumbnail\">\n                    <img src=\"".concat(product.images[0].url, "\" alt=\"\" style=\"width: 50px\" />\n                    <div>\n                      <a>").concat(product.name, "</a>\n                      <span>").concat(product.category, "</span>\n                    </div>\n                  </div>\n                </td>\n                <td>\n                  <div>\n                    <p>").concat(product.price, "</p>\n                    <span>Price</span>\n                  </div>\n                </td>\n                <td>\n                  <div>\n                    <p>").concat(product.ordered, "</p>\n                    <span>Orders</span>\n                  </div>\n                </td>\n                <td>\n                  <div>\n                    <p>").concat(product.stock, "</p>\n                    <span>Stock</span>\n                  </div>\n                </td>\n                <td>\n                  <div>\n                    <p style=\"color: var(--brand-color)\">").concat(Intl.NumberFormat("de-DE").format(product.stock * product.price), "</p>\n                    <span>Amount</span>\n                  </div>\n                </td>\n              </tr>\n    ");
        productList.appendChild(row);
    });
    // Update product count and pagination
    var productCountElement = document.getElementById("product-count");
    if (productCountElement) {
        productCountElement.textContent = "Showing ".concat(startIndex + 1, " to ").concat(endIndex, " of ").concat(data.length, " results");
    }
    updatePagination(data);
}
/**
 * Function to update pagination buttons
 * @param data
 */
function updatePagination(data) {
    var pagination = document.getElementById("product-pagination");
    if (pagination) {
        var pageButtons = pagination.getElementsByTagName("a");
        // Disable previous button if on first page
        if (currentPage === 1) {
            pageButtons[0].classList.add("disabled");
        }
        else {
            pageButtons[0].classList.remove("disabled");
        }
        // Update active page button
        for (var i = 1; i < pageButtons.length - 1; i++) {
            if (i === currentPage) {
                pageButtons[i].classList.add("active");
            }
            else {
                pageButtons[i].classList.remove("active");
            }
        }
        // Disable next button if on last page
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
// Event listeners for pagination buttons
previousPageBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        showBestSeller(products);
    }
});
nextPageBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        // nextPageBtn.innerHTML = currentPage.toString();
        showBestSeller(products);
    }
});
beginPageBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage > 1) {
        currentPage = 1;
        showBestSeller(products);
    }
});
endPageBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage = totalPages;
        // nextPageBtn.innerHTML = currentPage.toString();
        showBestSeller(products);
    }
});
/**
 * Lấy dữ liệu bảng sản phẩm từ API và chạy hàm showBestSeller
 */
function getProducts() {
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
                    products = data;
                    // showBestSeller(data);
                    showBestSeller(data);
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.log("Error fetching products:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
getProducts();
/**
 * Hàm hiển thị danh sách danh mục
 */
var showCategories = function (data) {
    var categoriesList = document.getElementById("categories");
    if (!categoriesList)
        return;
    categoriesList.innerHTML = "";
    data.forEach(function (category) {
        var row = document.createElement("tr");
        row.innerHTML = "\n  <td>\n    <a href=\"\">".concat(category.name, "</a>\n  </td>\n  <td>\n    <div>\n      <p style=\"color: var(--brand-color)\">4</p>\n      <span>Orders</span>\n    </div>\n  </td>\n  <td>\n    <div>\n      <p style=\"color: var(--brand-color)\">1000</p>\n      <span>Quantity</span>\n    </div>\n  </td>\n  <td>\n    <div>\n      <p>3.000.000.000</p>\n      <span>Amount</span>\n    </div>\n  </td>");
        categoriesList.appendChild(row);
    });
};
/**
 * Lấy dữ liệu bảng categories từ API và chạy hàm showCategories
 */
function getCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/categories")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    showCategories(data);
                    return [2 /*return*/, data];
                case 3:
                    error_2 = _a.sent();
                    console.log("Error fetching categories:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
getCategories();
