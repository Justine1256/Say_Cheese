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
    const sortedData = data.sort((a, b) => {
        return b.ordered - a.ordered;
    });
    var startIndex = (currentPage - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage;
    var pageProducts = sortedData.slice(startIndex, endIndex);
    pageProducts.forEach(function (product) {
        var row = document.createElement("tr");
        row.innerHTML = `
      <tr>
                <td>
                  <div class="row-thumbnail">
                    <img src="${product.images[0].url}" alt="" style="width: 50px" />
                    <div>
                      <a>${product.name}</a>
                      <span>${product.category}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <p>${product.price}</p>
                    <span>Price</span>
                  </div>
                </td>
                <td>
                  <div>
                    <p>${product.ordered}</p>
                    <span>Orders</span>
                  </div>
                </td>
                <td>
                  <div>
                    <p>${product.stock}</p>
                    <span>Stock</span>
                  </div>
                </td>
                <td>
                  <div>
                    <p style="color: var(--brand-color)">${Intl.NumberFormat("de-DE").format(product.stock * product.price)}</p>
                    <span>Amount</span>
                  </div>
                </td>
              </tr>
    `;
        productList.appendChild(row);
    });
    // Update product count and pagination
    const productCountElement = document.getElementById("product-count");
    if (productCountElement) {
        productCountElement.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${data.length} results`;
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
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/products");
            const data = yield res.json();
            products = data;
            // showBestSeller(data);
            showBestSeller(data);
            return data;
        }
        catch (error) {
            console.log("Error fetching products:", error);
        }
    });
}
getProducts();
/**
 * Hàm hiển thị danh sách danh mục
 */
const showCategories = (data) => {
    const categoriesList = document.getElementById("categories");
    if (!categoriesList)
        return;
    categoriesList.innerHTML = "";
    data.forEach((category) => {
        var row = document.createElement("tr");
        row.innerHTML = `
  <td>
    <a href="">${category.name}</a>
  </td>
  <td>
    <div>
      <p style="color: var(--brand-color)">4</p>
      <span>Orders</span>
    </div>
  </td>
  <td>
    <div>
      <p style="color: var(--brand-color)">1000</p>
      <span>Quantity</span>
    </div>
  </td>
  <td>
    <div>
      <p>3.000.000.000</p>
      <span>Amount</span>
    </div>
  </td>`;
        categoriesList.appendChild(row);
    });
};
/**
 * Lấy dữ liệu bảng categories từ API và chạy hàm showCategories
 */
function getCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/categories");
            const data = yield res.json();
            showCategories(data);
            return data;
        }
        catch (error) {
            console.log("Error fetching categories:", error);
        }
    });
}
getCategories();
