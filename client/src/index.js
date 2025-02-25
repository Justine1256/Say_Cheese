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
 * Biến đổi kiểu date "dd/mm/yyyy" thành kiểu Date Object
 */
function parseDatee(date) {
    var _a = date.split("/").map(Number), day = _a[0], month = _a[1], year = _a[2];
    return new Date(year, month - 1, day);
}
/**
 * Lọc sản phẩm bánh/trà/sữa
 */
function threeColsFilter() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, sua_beo_container_1, banh_trung_container_1, tra_thom_container_1, sortedData, sua_beo, banh_trung, tra_thom, error_1;
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
                    sua_beo_container_1 = document.getElementById("sua-beo");
                    banh_trung_container_1 = document.getElementById("banh_trung");
                    tra_thom_container_1 = document.getElementById("tra_thom");
                    sortedData = data.sort(function (a, b) {
                        var aDate = new Date(parseDatee(a.created_at));
                        var bDate = new Date(parseDatee(b.created_at));
                        return bDate.getTime() - aDate.getTime();
                    });
                    sua_beo = sortedData.filter(function (item) {
                        if (item.category == "Say Cheese THƠM BÉO" ||
                            item.category == "Say Cheese ĐẬM VỊ") {
                            return item;
                        }
                    });
                    sua_beo.splice(3);
                    sua_beo.forEach(function (element) {
                        var prod = "<div class=\"best-prod\">\n      <div class=\"product\">\n        <div class=\"overflow-hidden\">\n          <img src=\"".concat(element.images[0].url, "\" alt=\"\" />\n          <img class=\"tag\" src=\"../images/hot.png\" alt=\"\" />\n        </div>\n        <div class=\"bst-prod-content\">\n          <a href=\"\">").concat(element.name, "</a>\n           <a class=\"category-link\" href=\"\">").concat(element.category, "</a>\n           <div style=\"display:flex; align-items: center; justify-content: space-between;\">\n            <p>").concat(element.price, "\u0111</p>\n            <button class=\"cartBtn\" data=\"").concat(element.id, "\"><i class=\"bi bi-cart-fill\"></i></button>\n           </div>\n         </div>\n        </div>\n      </div>");
                        sua_beo_container_1.innerHTML += prod;
                    });
                    banh_trung = sortedData.filter(function (item) {
                        if (item.category == "Bánh Trứng Gà Non HongKong") {
                            return item;
                        }
                    });
                    banh_trung.splice(3);
                    banh_trung.forEach(function (element) {
                        var prod = "<div class=\"best-prod\">\n      <div class=\"product\">\n        <div class=\"overflow-hidden\">\n          <img src=\"".concat(element.images[0].url, "\" alt=\"\" />\n          <img class=\"tag\" src=\"../images/hot.png\" alt=\"\" />\n        </div>\n        <div class=\"bst-prod-content\">\n          <a href=\"\">").concat(element.name, "</a>\n           <a class=\"category-link\" href=\"\">").concat(element.category, "</a>\n                      <div style=\"display:flex; align-items: center; justify-content: space-between;\">\n            <p>").concat(element.price, "\u0111</p>\n            <button class=\"cartBtn\" data=\"").concat(element.id, "\"><i class=\"bi bi-cart-fill\"></i></button>\n           </div>\n         </div>\n        </div>\n      </div>");
                        banh_trung_container_1.innerHTML += prod;
                    });
                    tra_thom = sortedData.filter(function (item) {
                        if (item.category == "Say Cheese THANH MÁT") {
                            return item;
                        }
                    });
                    tra_thom.splice(3);
                    tra_thom.forEach(function (element) {
                        var prod = "<div class=\"best-prod\">\n      <div class=\"product\">\n        <div class=\"overflow-hidden\">\n          <img src=\"".concat(element.images[0].url, "\" alt=\"\" />\n          <img class=\"tag\" src=\"../images/hot.png\" alt=\"\" />\n        </div>\n        <div class=\"bst-prod-content\">\n          <a href=\"\">").concat(element.name, "</a>\n           <a class=\"category-link\" href=\"\">").concat(element.category, "</a>\n           <div style=\"display:flex; align-items: center; justify-content: space-between;\">\n            <p>").concat(element.price, "\u0111</p>\n            <button class=\"cartBtn\" data=\"").concat(element.id, "\"><i class=\"bi bi-cart-fill\"></i></button>\n           </div>\n         </div>\n        </div>\n      </div>");
                        tra_thom_container_1.innerHTML += prod;
                    });
                    console.log(sua_beo);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log("Error fetching categories:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchMostlikesProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, mostlikesContainer_1, sortedData, error_2;
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
                    mostlikesContainer_1 = document.getElementById("alllist");
                    sortedData = data.sort(function (a, b) { return b.likes - a.likes; });
                    console.log(sortedData);
                    sortedData.slice(0, 5).forEach(function (element) {
                        var prod = "<div class=\"product\">\n          <div class=\"overflow-hidden\">\n            <img src=\"".concat(element.images[0].url, "\" alt=\"\" />\n          </div>\n          <a href=\"#\">").concat(element.name, "</a>\n          <a class=\"category-link\" href=\"\">").concat(element.category, "</a>\n          <p>").concat(element.price, "\u0111</p>\n          <button class=\"cartBtn\" data=\"").concat(element.id, "\">Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng</button>\n        </div>");
                        mostlikesContainer_1.innerHTML += prod;
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log("Error fetching most likes products:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchBestSellingProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, bestSellersContainer_1, sortedData, error_3;
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
                    bestSellersContainer_1 = document.querySelector(".best-prod-list");
                    sortedData = data.sort(function (a, b) { return b.ordered - a.ordered; });
                    sortedData.slice(0, 6).forEach(function (element) {
                        var prod = "<div class=\"best-prod\">\n        <div class=\"product\">\n          <div class=\"overflow-hidden\">\n            <img src=\"".concat(element.images[0].url, "\" alt=\"\" />\n            <img class=\"tag\" src=\"../images/hot.png\" alt=\"\" />\n          </div>\n          <div class=\"bst-prod-content\">\n            <a href=\"\">").concat(element.name, "</a>\n            <a class=\"category-link\" href=\"\">").concat(element.category, "</a>\n           <div style=\"display:flex; align-items: center; justify-content: space-between;\">\n            <p>").concat(element.price, "\u0111</p>\n            <button class=\"cartBtn\" data=\"").concat(element.id, "\"><i class=\"bi bi-cart-fill\"></i></button>\n           </div>\n          </div>\n        </div>\n      </div>");
                        bestSellersContainer_1.innerHTML += prod;
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.log("Error fetching best selling products:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
threeColsFilter();
fetchMostlikesProducts();
fetchBestSellingProducts();
