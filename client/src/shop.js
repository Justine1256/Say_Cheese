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
const alllistShop = document.querySelector("#alllist");
console.log(alllistShop);
var currentPage = 1;
var productsPerPage = 9;
var products = [];
var categories = [];
let filteredProducts = []; // Declare a separate array for filtered products
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
            showShopList(filteredProducts.length > 0 ? filteredProducts : products); // Use filtered products if available
        }
    });
}
if (nextPageBtn) {
    nextPageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var totalPages = Math.ceil((filteredProducts.length > 0 ? filteredProducts : products).length /
            productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showShopList(filteredProducts.length > 0 ? filteredProducts : products); // Use filtered products if available
        }
    });
}
if (beginPageBtn) {
    beginPageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        currentPage = 1; // Reset to first page
        showShopList(filteredProducts.length > 0 ? filteredProducts : products); // Use filtered products if available
    });
}
if (endPageBtn) {
    endPageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var totalPages = Math.ceil((filteredProducts.length > 0 ? filteredProducts : products).length /
            productsPerPage);
        currentPage = totalPages; // Go to last page
        showShopList(filteredProducts.length > 0 ? filteredProducts : products); // Use filtered products if available
    });
}
/**
 * Function to call API and show products
 */
function APIGetProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/products");
            const data = yield res.json();
            products = data; // Store fetched products for pagination
            showShopList(data);
            return data;
        }
        catch (error) {
            console.log("Error fetching products:", error);
        }
    });
}
APIGetProducts();
/**
 * Function to call API and show products
 */
function APIGetCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/categories");
            const data = yield res.json();
            categories = data; // Store fetched products for pagination
            showCategories(data);
            return data;
        }
        catch (error) {
            console.log("Error fetching products:", error);
        }
    });
}
APIGetCategories();
function updatePaginationProd(data) {
    var pagination = document.getElementById("product-pagination");
    if (pagination) {
        var pageButtons = pagination.getElementsByTagName("a");
        if (currentPage === 1) {
            pageButtons[0].classList.remove("active");
            pageButtons[1].classList.remove("active");
            pageButtons[0].classList.add("disabled");
            pageButtons[1].classList.add("disabled");
        }
        else {
            pageButtons[0].classList.remove("disabled");
            pageButtons[1].classList.remove("disabled");
            pageButtons[0].classList.add("active");
            pageButtons[1].classList.add("active");
        }
        var totalPages = Math.ceil(data.length / productsPerPage);
        if (currentPage === totalPages) {
            pageButtons[2].classList.remove("active");
            pageButtons[3].classList.remove("active");
            pageButtons[2].classList.add("disabled");
            pageButtons[3].classList.add("disabled");
        }
        else {
            pageButtons[2].classList.remove("disabled");
            pageButtons[3].classList.remove("disabled");
            pageButtons[2].classList.add("active");
            pageButtons[3].classList.add("active");
        }
    }
    else {
        console.log("Không tìm thấy element #product-pagination");
    }
}
/**
 * Show list of categories
 */
const showCategories = (data) => {
    const categoriesList = document.getElementById("menu-cate");
    data.forEach((cate) => {
        const li = `<li><a href="shop.html?id=${cate.id}">${cate.name}</a></li>`;
        categoriesList.innerHTML += li;
    });
};
/**
 * Show the list of products
 */
const sortProducts = (criteria) => {
    console.log("Sorting products by:", criteria); // Debugging line
    if (criteria === "price-high") {
        products.sort((a, b) => a.price - b.price);
    }
    else if (criteria === "name") {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (criteria === "price-low") {
        products.sort((a, b) => b.price - a.price);
    }
};
const showShopList = (data) => {
    var startIndex = (currentPage - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage;
    var pageProducts = data.slice(startIndex, endIndex);
    const productCountElement = document.getElementById("product-count");
    if (productCountElement) {
        productCountElement.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${data.length} results`;
    }
    if (!alllistShop)
        return;
    alllistShop.innerHTML = pageProducts
        .map((element) => `<div class="product">
        <a href="product-details.html?id=${element.id}">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="" />
            <img class="tag" src="../images/hot.png" alt="" />
          </div>
          <a href="#">${element.name}</a>
          <a class="category-link" href="">${element.category}</a>
          <p>${element.price}đ</p>
          <button class="cartBtn" onclick="addProductToCart(${element.id})">Thêm vào giỏ hàng</button>
        </a>
      </div>`)
        .join("");
    // Update product count and pagination
    if (productCountElement) {
        if (endIndex > data.length) {
            endIndex = data.length;
        }
        productCountElement.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${data.length} results`;
    }
    updatePaginationProd(data); // Update pagination after sorting
};
/**
 * Filter products by category
 */
const getCateId = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
function cateFilter(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const res = yield fetch("http://localhost:3000/categories");
            const data = yield res.json();
            const category = ((_a = data.find((c) => c.id === id)) === null || _a === void 0 ? void 0 : _a.name) || "";
            console.log(category);
            if (filteredProducts.length > 0) {
                filteredProducts = filteredProducts.filter((p) => p.category === category);
            }
            else {
                products = products.filter((p) => p.category === category);
            }
            const finalProducts = filteredProducts.length > 0 ? filteredProducts : products;
            if (finalProducts.length > 0) {
                showShopList(finalProducts);
            }
            else {
                console.log("No products found for this category.");
            }
            if (filteredProducts.length > 0) {
                showShopList(filteredProducts);
            }
            else {
                console.log("No products found for this category.");
            }
        }
        catch (error) {
            console.log("Error fetching categories:", error);
        }
    });
}
let cateId = getCateId("id"); // Remove the type annotation and let TypeScript infer the type
if (cateId != null) {
    cateFilter(cateId);
}
else {
    showShopList(products);
}
/**
 * Filter products by tags
 */
const filterList = document.getElementById("filterList");
const sortList = document.getElementById("sortList");
const filterProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Filter products function called"); // Debugging line
    // Call sortProducts with the selected criteria
    const selectedSort = sortList.value;
    console.log("Selected sort option:", selectedSort); // Debugging line
    sortProducts(selectedSort);
    filteredProducts = products; // Initialize with all products
    const selectedTag = filterList.value; // Corrected to avoid redeclaration
    if (selectedTag === "Tất cả" || selectedTag === null) {
        filteredProducts = products; // Show all products
        currentPage = 1; // Reset to first page when showing all products
    }
    else {
        filteredProducts = products.filter((product) => product.tags.includes(selectedTag));
    }
    showShopList(filteredProducts); // Update the displayed product list
    updatePaginationProd(filteredProducts); // Update pagination based on filtered products
});
filterList.addEventListener("change", filterProducts);
sortList.addEventListener("change", filterProducts);
