interface Product {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: { url: string; alt: string }[];
  likes: number;
  tags: string[];
  created_at: string;
  ordered: number;
}

interface Category {
  id: string;
  name: string;
}

const alllistShop = document.querySelector("#alllist") as HTMLElement;
console.log(alllistShop);

var currentPage = 1;
var productsPerPage = 9;
var products: Product[] = [];

// Pagination buttons
var beginPageBtn = document.getElementById("begin-btn") as HTMLElement;
var previousPageBtn = document.getElementById("previous-btn") as HTMLElement;
var nextPageBtn = document.getElementById("next-btn") as HTMLElement;
var endPageBtn = document.getElementById("end-btn") as HTMLElement;

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
async function APIGetProducts() {
  try {
    const res = await fetch("http://localhost:3000/products");
    const data: Product[] = await res.json();
    products = data; // Store fetched products for pagination
    showShopList(data);
    // console.log(products);
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}
APIGetProducts();

function updatePaginationProd(data: any[]) {
  var pagination = document.getElementById("product-pagination");
  if (pagination) {
    var pageButtons = pagination.getElementsByTagName("a");

    if (currentPage === 1) {
      pageButtons[0].classList.add("disabled");
      pageButtons[1].classList.add("disabled");
    } else {
      pageButtons[0].classList.remove("disabled");
      pageButtons[1].classList.remove("disabled");
    }

    for (var i = 2; i < pageButtons.length - 1; i++) {
      if (i === currentPage) {
        pageButtons[i].classList.add("active");
      } else {
        pageButtons[i].classList.remove("active");
      }
    }

    var totalPages = Math.ceil(data.length / productsPerPage);
    if (currentPage === totalPages) {
      pageButtons[pageButtons.length - 1].classList.add("disabled");
    } else {
      pageButtons[pageButtons.length - 1].classList.remove("disabled");
    }
  } else {
    console.log("Không tìm thấy element #product-pagination");
  }
}
/**
 * Show the list of products
 */
const showShopList = (data: Product[]) => {
  var startIndex = (currentPage - 1) * productsPerPage;
  var endIndex = startIndex + productsPerPage;
  var pageProducts = data.slice(startIndex, endIndex);

  const productCountElement = document.getElementById("product-count");
  if (productCountElement) {
    productCountElement.textContent = `Showing ${
      startIndex + 1
    } to ${endIndex} of ${data.length} results`;
  }
  if (!alllistShop) return;

  var startIndex = (currentPage - 1) * productsPerPage;
  var endIndex = startIndex + productsPerPage;
  var pageProducts = data.slice(startIndex, endIndex);

  alllistShop.innerHTML = pageProducts
    .map(
      (element) => `<div class="product">
        <a href="product-details.html?id=${element.id}">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="" />
            <img class="tag" src="../images/hot.png" alt="" />
          </div>
          <a href="#">${element.name}</a>
          <a class="category-link" href="">${element.category}</a>
          <p>${element.price}đ</p>
          <button class="cartBtn" data="${element.id}">Thêm vào giỏ hàng</button>
        </a>
      </div>`
    )
    .join("");

  // Update product count and pagination
  if (productCountElement) {
    productCountElement.textContent = `Showing ${
      startIndex + 1
    } to ${endIndex} of ${data.length} results`;
  }
  updatePaginationProd(data);
};
/**
 * Lọc sản phẩm theo danh mục
 */
const getCateId = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

if (getCateId("id") != null) {
  console.log(getCateId("id"));

  // addToCart(parseInt(id));
  /**
   * Lấy dữ liệu bảng sản phẩm từ API
   */
  async function getFilteredProducts(id: number) {
    try {
      const cate_res = await fetch("http://localhost:3000/category");
      const cate_data = await cate_res.json();
      const category = cate_data.find((c: any) => c.id === id)?.name; // Use optional chaining to handle null case

      const res = await fetch(
        "http://localhost:3000/products?cate_id=" + category
      );
      const data = await res.json();
      showShopList(data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  }
  getFilteredProducts(parseInt(getCateId("id") ?? "0")); // Use null coalescing operator to provide a default value
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
