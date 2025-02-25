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
/**
 * Hiển thị danh sách sản phẩm
 */
var alllist = document.querySelector("#alllist");
var showProductList = function (data) {
    if (!alllist) {
        console.log("Element '#alllist' not found");
        return;
    }
    data.forEach(function (element) {
        var prod = "\n      <div class=\"product\">\n        <a href=\"product-details.html?id=".concat(element.id, "\">\n          <div class=\"overflow-hidden\">\n            <img src=\"").concat(element.images[0].url, "\" alt=\"\" />\n            <img class=\"tag\" src=\"../images/hot.png\" alt=\"\" />\n          </div>\n          <a href=\"#\">").concat(element.name, "</a>\n          <a class=\"category-link\" href=\"\">").concat(element.category, "</a>\n          <p>").concat(element.price, "\u0111</p>\n          <button class=\"cartBtn\" data=\"").concat(element.id, "\">Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng</button>\n        </a>\n      </div>\n          ");
        alllist.innerHTML += prod;
    });
};
/**
 * Hiển thị danh sách 5 sản phẩm mới nhất
 */
var newlist = document.querySelector("#newlist");
var show5newest = function (data) {
    if (!newlist) {
        console.log("Element '#newlist' not found");
        return;
    }
    //Sắp xếp mảng sp theo "created_at"
    var sortedData = data.sort(function (a, b) {
        var aDate = new Date(parseDate(a.created_at));
        var bDate = new Date(parseDate(b.created_at));
        return bDate.getTime() - aDate.getTime();
    });
    var newest = sortedData.slice(-5);
    console.log(newest);
    newest.forEach(function (element) {
        var prod = "\n      <div class=\"product\">\n        <a href=\"product-details.html?id=".concat(element.id, "\">\n          <div class=\"overflow-hidden\">\n            <img src=\"").concat(element.images[0].url, "\" alt=\"\" />\n            <img class=\"tag\" src=\"../images/hot.png\" alt=\"\" />\n          </div>\n          <a href=\"#\">").concat(element.name, "</a>\n          <a class=\"category-link\" href=\"\">").concat(element.category, "</a>\n          <p>").concat(element.price, "\u0111</p>\n          <button class=\"cartBtn\" data=\"").concat(element.id, "\">Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng</button>\n        </a>\n      </div>\n          ");
        newlist.innerHTML += prod;
    });
};
/**
 * Biến đổi kiểu date "dd/mm/yyyy" thành kiểu Date Object
 */
function parseDate(date) {
    var _a = date.split("/").map(Number), day = _a[0], month = _a[1], year = _a[2];
    return new Date(year, month - 1, day);
}
/**
 * Hiển thị danh sách danh mục ở select
 */
var showCateListMenu = function (data) {
    var list = document.querySelectorAll(".menu-cate");
    list.forEach(function (item) {
        data.forEach(function (element) {
            var cate = "\n            <li>\n            <a href=\"shop.html?id=".concat(element.id, "\">").concat(element.name, "</a>\n            </li>\n            ");
            item.innerHTML += cate;
        });
    });
};
/**
 * Lấy dữ liệu bảng sản phẩm từ API và chạy hàm showProducts
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
                    showProductList(data);
                    show5newest(data);
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
getProducts();
/**
 * Lấy dữ liệu bảng danh mục từ API và chạy hàm showCateListMenu
 */
function getCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/category")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    showCateListMenu(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log("Error fetching categories:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Lấy param id từ url
 */
var getProductId = function (param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
var id = getProductId("id");
/**
 * Hiển thị chi tiết sản phẩm
 */
var container = document.querySelector(".product-details");
var showDetails = function (data) {
    var details = "\n  <div>\n      <img src=\"".concat(data.images[0].url, "\" width=\"500\" height=\"400\" />\n      <div class=\"detail-img\">\n        <a href=\"\">\n          <img src=\"../images/detail-img.jpg\" width=\"100\" height=\"100\" />\n        </a>\n        <a href=\"\">\n          <img src=\"../images/detail-img2.jpg\" width=\"100\" height=\"100\" />\n        </a>\n        <a href=\"\">\n          <img src=\"../images/detail-img3.jpg\" width=\"100\" height=\"100\" />\n        </a>\n        <a href=\"\">\n          <img src=\"../images/detail-img4.jpg\" width=\"100\" height=\"100\" />\n        </a>\n      </div>\n    </div>\n    <div class=\"details\">\n      <div>\n        <h1>").concat(data.name, "</h1>\n        <p class=\"\">").concat(data.category, "</p>\n        <div>\n          <img src=\"../images/star.png\" width=\"13\" height=\"13\" />\n          <img src=\"../images/star.png\" width=\"13\" height=\"13\" />\n          <img src=\"../images/star.png\" width=\"13\" height=\"13\" />\n          <img src=\"../images/star.png\" width=\"13\" height=\"13\" />\n          <img src=\"../images/star.png\" width=\"13\" height=\"13\" />\n        </div>\n        <p class=\"price\">").concat(data.price, "</p>\n        <p>").concat(data.description, "</p>\n      </div>\n      <div class=\"btn\">\n        <button>Mua ngay</button>\n        <button>Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng</button>\n      </div>\n      <div class=\"prod-social\">\n        <a href=\"#\" id=\"facebook\">\n          <img src=\"../images/facebook.png\" width=\"13\" height=\"13\" />\n          Like\n        </a>\n        <a href=\"#\" id=\"twitter\">\n          <img src=\"../images/twitter.png\" width=\"13\" height=\"13\" />\n          Tweet\n        </a>\n        <a href=\"#\" id=\"pinterest\">\n          <img src=\"../images/pinterest.png\" width=\"13\" height=\"13\" />\n          Save\n        </a>\n        <a href=\"#\" id=\"instagram\">\n          <img src=\"../images/instagram.png\" width=\"13\" height=\"13\" />\n          Share\n        </a>\n        <a href=\"#\" id=\"google-plus\">\n          <img src=\"../images/google-plus.png\" width=\"16\" height=\"16\" />\n          Share\n        </a>\n      </div>\n    </div>\n  ");
    container.innerHTML = details;
};
/**
 * Lấy dữ liệu chi tiết sản phẩm theo id
 */
function getProductsDetails() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id) {
                        console.error("Product ID is not available.");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:3000/products/".concat(id))];
                case 2:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("HTTP error! status: ".concat(res.status));
                    }
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    console.log(data);
                    showDetails(data);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.log("Error fetching product details:", error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// getProductsDetails();
