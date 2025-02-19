/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.showProductList = void 0;\nexports.getCategories = getCategories;\n/**\n * Hiển thị sản phẩm trong giỏ hàng\n */\nconst showCart = (cart) => __awaiter(void 0, void 0, void 0, function* () {\n    const cartBody = document.getElementById(\"cart-body\");\n    cart.forEach((item) => {\n        const cartItem = `<tr>\r\n      <td class=\"product-remove\">\r\n        <button class=\"delete-cart\" data=\"${item.id}\">\r\n          <img src=\"../IMG/trash-bin.png\"/>\r\n        </button>\r\n      </td>\r\n      <td class=\"product-thumb\">\r\n        <a href=\"product-details.html\">\r\n          <img src=\"${item.img}\" alt=\"${item.name}\" />\r\n        </a>\r\n      </td>\r\n      <td class=\"product-name\">\r\n        <a href=\"product-details.html?id=${item.id}\">${item.name}</a>\r\n      </td>\r\n      <td class=\"product-price\">${item.price}</td>\r\n      <td class=\"product-quantity\">\r\n        <input\r\n          type=\"number\"\r\n          name=\"quantity\"\r\n          id=\"quantity-${item.id}\"\r\n          value=\"${item.quantity}\"\r\n          min=\"1\"\r\n          max=\"100\"\r\n          onchange=\"updateProductTotal(${item.id})\"\r\n        />\r\n      </td>\r\n      <td id=\"product-total-${item.id}\"></td>\r\n    </tr>`;\n        cartBody.insertAdjacentHTML(\"beforeend\", cartItem);\n    });\n    const deleteCartBtn = document.querySelectorAll(\".delete-cart\");\n    deleteCartBtn.forEach((btn) => {\n        btn.addEventListener(\"click\", (event) => {\n            event.preventDefault();\n            // Get the data attribute value\n            const dataValue = btn.getAttribute(\"data\");\n            // Check if dataValue is not null before parsing\n            if (dataValue !== null) {\n                deleteCart(parseInt(dataValue));\n            }\n            else {\n                console.error(\"Data attribute 'data' is missing on the button.\");\n            }\n        });\n    });\n});\n/**\n * Thêm vào giỏ hàng\n */\nconst addToCart = (i) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const res = yield fetch(\"http://localhost:3000/products/\" + i);\n        const data = yield res.json();\n        const selectProduct = data;\n        const product = {\n            id: selectProduct.id,\n            name: selectProduct.name,\n            cate_id: selectProduct.cate_id,\n            img: selectProduct.img,\n            price: selectProduct.price,\n            quantity: 1,\n        };\n        fetch(\"http://localhost:3000/cart/\", {\n            headers: {\n                \"content-type\": \"application/json\",\n            },\n            method: \"POST\",\n            body: JSON.stringify(product),\n        })\n            .then((res) => {\n            console.log(res);\n        })\n            .catch((error) => {\n            console.log(error);\n        });\n        alert(\"Thêm vào giỏ hàng thành công\");\n    }\n    catch (error) {\n        console.log(error);\n    }\n});\n/**\n * Xóa sản phẩm trong giỏ hàng\n */\nconst deleteCart = (id) => __awaiter(void 0, void 0, void 0, function* () {\n    if (confirm(\"Bạn có chắc chắn muốn xóa?\")) {\n        fetch(\"http://localhost:3000/cart/\" + id, {\n            headers: {\n                \"Content-Type\": \"application/json\",\n            },\n            method: \"DELETE\",\n        })\n            .then((res) => console.log(res))\n            .catch((error) => console.log(error));\n    }\n});\n/**\n * Update số lượng sản phẩm và giá\n */\nconst updateProductTotal = (id) => __awaiter(void 0, void 0, void 0, function* () {\n    const res = yield fetch(\"http://localhost:3000/cart/\" + id);\n    const data = yield res.json();\n    const selectProduct = data;\n    const quantity = parseInt(document.getElementById(`quantity-${id}`).value);\n    selectProduct.quantity = quantity;\n    fetch(\"http://localhost:3000/cart/\" + id, {\n        headers: {\n            \"content-type\": \"application/json\",\n        },\n        method: \"PATCH\",\n        body: JSON.stringify(selectProduct),\n    })\n        .then((res) => console.log(res))\n        .catch((error) => console.log(error));\n});\n/**\n * Hiển thị danh sách danh mục ở select\n */\nconst showCateListMenu = (data) => {\n    const list = document.querySelectorAll(\".menu-cate\");\n    list.forEach((item) => {\n        data.forEach((element) => {\n            const cate = `\r\n          <li>\r\n          <a href=\"shop.html?id=${element.id}\">${element.name}</a>\r\n          </li>\r\n          `;\n            item.innerHTML += cate;\n        });\n    });\n};\nfunction getCategories(showCateList) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const res = yield fetch(\"http://localhost:3000/category\");\n            const data = yield res.json();\n            showCateListMenu(data);\n            return data;\n        }\n        catch (error) {\n            console.log(\"Error fetching categories:\", error);\n        }\n    });\n}\n/**\n * Hiển thị danh sách sản phẩm\n */\nconst productList = document.querySelector(\".product-list\");\nconst showProductList = (data) => {\n    data.forEach((element) => {\n        const prod = `\r\n      <div class=\"product\">\r\n        <a href=\"product-details.html?id=${element.id}\">\r\n          <div class=\"overflow-hidden\">\r\n            <img src=\"${element.img}\" alt=\"\" />\r\n            <img class=\"tag\" src=\"../IMG/hot.png\" alt=\"\" />\r\n          </div>\r\n          <a href=\"#\">${element.name}</a>\r\n          <a class=\"category-link\" href=\"\">${element.cate_id}</a>\r\n          <p>${element.price}đ</p>\r\n          <button class=\"cartBtn\" data=\"${element.id}\">Thêm vào giỏ hàng</button>\r\n        </a>\r\n      </div>\r\n          `;\n        productList.innerHTML += prod;\n    });\n    const cartBtn = document.querySelectorAll(\".cartBtn\");\n    cartBtn.forEach((btn) => {\n        btn.addEventListener(\"click\", (event) => {\n            event.preventDefault();\n            // Get data attribute value\n            const dataValue = btn.getAttribute(\"data\");\n            // Chedk ì dataValue is not null before parsing\n            if (dataValue !== null) {\n                addToCart(parseInt(dataValue));\n            }\n            else {\n                console.error(\"Data attribute 'data' is missing on the button.\");\n            }\n        });\n    });\n};\nexports.showProductList = showProductList;\n/**\n * Lọc sản phẩm theo danh mục\n */\nconst getCateId = (param) => {\n    const urlParams = new URLSearchParams(window.location.search);\n    return urlParams.get(param);\n};\nconst id = getCateId(\"id\");\nif (id != null) {\n    addToCart(parseInt(id));\n    /**\n     * Lấy dữ liệu bảng sản phẩm từ API\n     */\n    function getProducts(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const cate_res = yield fetch(\"http://localhost:3000/category\");\n                const cate_data = yield cate_res.json();\n                const category = cate_data.find((c) => c.id === id).name;\n                const res = yield fetch(\"http://localhost:3000/products?cate_id=\" + category);\n                const data = yield res.json();\n                (0, exports.showProductList)(data);\n            }\n            catch (error) {\n                console.log(\"Error fetching categories:\", error);\n            }\n        });\n    }\n    getProducts(parseInt(id));\n}\nelse {\n    /**\n     * Lấy dữ liệu bảng sản phẩm từ API\n     */\n    function getProducts() {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const res = yield fetch(\"http://localhost:3000/products\");\n                const data = yield res.json();\n                (0, exports.showProductList)(data);\n            }\n            catch (error) {\n                console.log(\"Error fetching categories:\", error);\n            }\n        });\n    }\n    getProducts();\n}\n\n\n//# sourceURL=webpack://asm/./app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./app.js"](0, __webpack_exports__);
/******/ 	
/******/ })()
;