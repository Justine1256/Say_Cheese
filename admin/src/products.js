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
var _this = this;
var alllist = document.querySelector("#alllist");
var currentPage = 1;
var productsPerPage = 10;
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
            showProductList(products);
        }
    });
}
if (nextPageBtn) {
    nextPageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var totalPages = Math.ceil(products.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showProductList(products);
        }
    });
}
if (beginPageBtn) {
    beginPageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage = 1;
            showProductList(products);
        }
    });
}
if (endPageBtn) {
    endPageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var totalPages = Math.ceil(products.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage = totalPages;
            showProductList(products);
        }
    });
}
var getSelectedTags = function () {
    var checkboxes = document.querySelectorAll('input[name="tag"]');
    var selectedValues = [];
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedValues.push(checkbox.value);
        }
    });
    return selectedValues;
};
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
var showProductList = function (data) {
    if (!alllist)
        return;
    var startIndex = (currentPage - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage;
    var pageProducts = data.slice(startIndex, endIndex);
    alllist.innerHTML = pageProducts
        .map(function (element) { return "\n    <tr>\n      <td>".concat(element.id, "</td>\n      <td class=\"display-flex row-thumbnail\">\n        <img src=\"").concat(element.images[0].url, "\" alt=\"\" style=\"width: 50px\" />\n        <div class=\"row-thumbnail\">\n          <a>").concat(element.name, "</a>\n          <span>").concat(element.category, "</span>\n        </div>\n      </td>\n      <td style=\"color: var(--brand-color)\">").concat(element.stock, "</td>\n      <td>").concat(element.price, "</td>\n      <td style=\"color: var(--brand-color)\">").concat(element.ordered, "</td>\n      <td><span>").concat(element.likes, "</span></td>\n      <td>\n        <button class=\"edit-btn\" onclick=\"showEditForm(").concat(element.id, ")\">Edit</button>\n        <button class=\"delete-btn\" onclick=\"deleteProduct(").concat(element.id, ")\">Delete</button>\n      </td>\n    </tr>\n  "); })
        .join("");
    var productCountElement = document.getElementById("product-count");
    if (productCountElement) {
        productCountElement.textContent = "Showing ".concat(startIndex + 1, " to ").concat(endIndex, " of ").concat(data.length, " results");
    }
    if (!alllist)
        return;
    var startIndex = (currentPage - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage;
    var pageProducts = data.slice(startIndex, endIndex);
    alllist.innerHTML = pageProducts
        .map(function (element) { return "\n    <tr>\n      <td>".concat(element.id, "</td>\n      <td class=\"display-flex row-thumbnail\">\n        <img src=\"").concat(element.images[0].url, "\" alt=\"\" style=\"width: 50px\" />\n        <div class=\"row-thumbnail\">\n          <a>").concat(element.name, "</a>\n          <span>").concat(element.category, "</span>\n        </div>\n      </td>\n      <td style=\"color: var(--brand-color)\">").concat(element.stock, "</td>\n      <td>").concat(element.price, "</td>\n      <td style=\"color: var(--brand-color)\">").concat(element.ordered, "</td>\n      <td><span>").concat(element.likes, "</span></td>\n      <td>\n        <button class=\"edit-btn\" onclick=\"showEditForm(").concat(element.id, ")\">Edit</button>\n        <button class=\"delete-btn\" onclick=\"deleteProduct(").concat(element.id, ")\">Delete</button>\n\n      </td>\n    </tr>\n  "); })
        .join("");
    // Update product count and pagination
    if (productCountElement) {
        productCountElement.textContent = "Showing ".concat(startIndex + 1, " to ").concat(endIndex, " of ").concat(data.length, " results");
    }
    updatePaginationProd(data);
};
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
                    showProductList(data);
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
/**
 * Function to redirect to add-product page and show editing product's details
 * @param id
 */
var showEditForm = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var product, formContainer, tags, saveBtn, cancelBtn;
    return __generator(this, function (_a) {
        product = products[parseInt(id)];
        if (!product)
            alert("Product not found");
        formContainer = document.getElementById("editFormContainer");
        if (formContainer) {
            formContainer.dataset.productId = id;
        }
        // Fill the inline edit form
        document.getElementById("editName").value =
            product.name;
        document.getElementById("editDescription").value =
            product.description;
        document.getElementById("editImage").value =
            product.images[0].url;
        document.getElementById("editStock").value =
            product.stock.toString();
        document.getElementById("editPrice").value =
            product.price.toString();
        document.getElementById("editCategory").value =
            product.category.toString();
        tags = product.tags || [];
        document.getElementById("editNewItem").checked =
            tags.includes("Món mới");
        document.getElementById("editSignature").checked =
            tags.includes("Đặc trưng");
        document.getElementById("editBestSeller").checked =
            tags.includes("Bán chạy");
        // Show the form
        if (formContainer) {
            document.getElementById("products-main").style.display =
                "none";
            formContainer.style.display = "block";
            saveBtn = document.createElement("button");
            saveBtn.type = "button";
            saveBtn.style.float = "right";
            saveBtn.textContent = "Save Changes";
            saveBtn.onclick = function () { return saveEdit(id); };
            cancelBtn = document.createElement("button");
            cancelBtn.type = "button";
            cancelBtn.style.float = "right";
            cancelBtn.style.marginRight = "10px";
            cancelBtn.style.backgroundColor = "transparent";
            cancelBtn.style.color = "var(--brand-color)";
            cancelBtn.textContent = "Cancel";
            cancelBtn.onclick = cancelEdit;
            // Append buttons to form container
            formContainer.appendChild(saveBtn);
            formContainer.appendChild(cancelBtn);
        }
        return [2 /*return*/];
    });
}); };
var saveEdit = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var name_1, description, image, stock, price, category, tags, updatedProduct, response, index, formContainer, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                name_1 = document.getElementById("editName")
                    .value;
                description = document.getElementById("editDescription").value;
                image = document.getElementById("editImage")
                    .value;
                stock = parseInt(document.getElementById("editStock").value);
                price = parseFloat(document.getElementById("editPrice").value);
                category = document.getElementById("editCategory").value;
                tags = [];
                if (document.getElementById("editNewItem").checked) {
                    tags.push("Món mới");
                }
                if (document.getElementById("editSignature").checked) {
                    tags.push("Đặc trưng");
                }
                if (document.getElementById("editBestSeller").checked) {
                    tags.push("Bán chạy");
                }
                if (!id)
                    throw new Error("Product ID not found");
                updatedProduct = {
                    id: id,
                    name: name_1,
                    description: description,
                    category: category,
                    price: price,
                    stock: stock,
                    images: [{ url: image, alt: description || name_1 }],
                    tags: tags,
                    likes: ((_a = products.find(function (p) { return p.id == id; })) === null || _a === void 0 ? void 0 : _a.likes) || 0,
                    ordered: ((_b = products.find(function (p) { return p.id == id; })) === null || _b === void 0 ? void 0 : _b.ordered) || 0,
                    created_at: new Date().toISOString(),
                };
                return [4 /*yield*/, fetch("http://localhost:3000/products/".concat(id), {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedProduct),
                    })];
            case 1:
                response = _c.sent();
                if (!response.ok)
                    throw new Error("Failed to update product");
                index = products.findIndex(function (p) { return p.id === id; });
                if (index !== -1) {
                    products[index] = updatedProduct;
                }
                // Refresh product list
                showProductList(products);
                formContainer = document.getElementById("editFormContainer");
                if (formContainer) {
                    document.getElementById("products-main").style.display =
                        "none";
                    formContainer.style.display = "none";
                }
                alert("Product updated successfully!");
                return [3 /*break*/, 3];
            case 2:
                error_2 = _c.sent();
                console.error("Error updating product:", error_2);
                alert("Failed to update product. Please try again.");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var cancelEdit = function () {
    var formContainer = document.getElementById("editFormContainer");
    if (formContainer) {
        formContainer.style.display = "none";
        document.getElementById("products-main").style.display =
            "none";
    }
};
/**
 * Function to delete product then redirect to show products page
 * @param id
 * @returns products page
 */
var deleteProduct = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?"))
                    return [2 /*return*/];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:3000/products/".concat(id), {
                        method: "DELETE",
                    })];
            case 2:
                _a.sent();
                alert("Sản phẩm đã bị xóa!");
                window.location.href = "/admin/views/add-product.html";
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Lỗi khi xóa sản phẩm:", error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Function to add a product to json database then redirect to products show page
 */
var addProduct = function () { return __awaiter(_this, void 0, void 0, function () {
    var nameInput, descInput, imageInput, categoryInput, stockInput, priceInput, lastProductId, newId, newProduct, res, errorData, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                nameInput = document.getElementById("name");
                descInput = document.getElementById("description");
                imageInput = document.getElementById("image");
                categoryInput = document.getElementById("category");
                stockInput = document.getElementById("stock");
                priceInput = document.getElementById("price");
                // Clear previous error messages
                document.querySelectorAll(".error-message").forEach(function (el) { return el.remove(); });
                // Validate inputs
                if (!nameInput.value.trim()) {
                    alert("Product name is required");
                    return [2 /*return*/];
                }
                if (!descInput.value.trim()) {
                    alert("Description is required");
                    return [2 /*return*/];
                }
                if (!imageInput.value.trim()) {
                    alert("Image URL is required");
                    return [2 /*return*/];
                }
                if (!categoryInput.value.trim()) {
                    alert("Category is required");
                    return [2 /*return*/];
                }
                if (!stockInput.value.trim() ||
                    isNaN(parseInt(stockInput.value)) ||
                    parseInt(stockInput.value) <= 0) {
                    alert("Quantity must be a positive number");
                    return [2 /*return*/];
                }
                if (!priceInput.value.trim() ||
                    isNaN(parseFloat(priceInput.value)) ||
                    parseFloat(priceInput.value) <= 0) {
                    alert("Price must be a positive number");
                    return [2 /*return*/];
                }
                lastProductId = parseInt((_b = (_a = products[products.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "0");
                newId = (lastProductId + 1).toString();
                newProduct = {
                    id: newId.toString(),
                    name: nameInput.value.trim(),
                    description: descInput.value.trim(),
                    images: [
                        {
                            url: imageInput.value.trim(),
                            alt: descInput.value.trim() || nameInput.value.trim(),
                        },
                    ],
                    category: categoryInput.value.trim(),
                    stock: parseInt(stockInput.value),
                    price: parseFloat(priceInput.value),
                    tags: getSelectedTags(),
                    likes: 0,
                    ordered: 0,
                    created_at: new Date().toISOString(),
                };
                return [4 /*yield*/, fetch("http://localhost:3000/products", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newProduct),
                    })];
            case 1:
                res = _c.sent();
                if (!!res.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, res.json()];
            case 2:
                errorData = _c.sent();
                throw new Error(errorData.message || "Failed to add product");
            case 3:
                // Show success message and redirect
                alert("Product added successfully!");
                window.location.href = "products.html";
                return [3 /*break*/, 5];
            case 4:
                error_4 = _c.sent();
                console.error("Error adding product:", error_4);
                alert("Error: ".concat(error_4 instanceof Error ? error_4.message : "Failed to add product"));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
