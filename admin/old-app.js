/**
 * Hiển thị sản phẩm trong giỏ hàng
 */
const showCart = async (cart) => {
  const cartBody = document.getElementById("cart-body");

  cart.forEach((item) => {
    var cartItem = `<tr>
      <td class="product-remove">
        <button class="delete-cart" data="${item.id}">
          <img src="../IMG/trash-bin.png"/>
        </button>
      </td>
      <td class="product-thumb">
        <a href="product-details.html">
          <img src="${item.img}" alt="${item.name}" />
        </a>
      </td>
      <td class="product-name">
        <a href="product-details.html?id=${item.id}">${item.name}</a>
      </td>
      <td class="product-price">${item.price}</td>
      <td class="product-quantity">
        <input
          type="number"
          name="quantity"
          id="quantity-${item.id}"
          value="${item.quantity}"
          min="1"
          max="100"
          onchange="updateProductTotal(${item.id})"
        />
      </td>
      <td id="product-total-${item.id}"></td>
    </tr>`;
    cartBody.insertAdjacentHTML("beforeend", cartItem);
  });
  let deleteCartBtn = document.querySelectorAll(".delete-cart");
  deleteCartBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      deleteCart(parseInt(btn.getAttribute("data")));
    });
  });
};

/**
 * Tính tổng giá tiền 1 loại sản phẩm
 */
// Tính tổng giá tiền 1 loại sản phẩm
// const productTotal = document.getElementById(`product-total-${id}`);
// productTotal.innerHTML = `${item.quantity} x ${selectProduct.price} = ${
//   quantity * selectProduct.price
// }`;

/**
 * Hiển thị tổng sản phẩm trong giỏ hàng
 */
const cartRes = await fetch("http://localhost:3000/cart/");
const cartData = await cartRes.json();
const cart = await cartData;
showCart(cart);
// console.log(cart);
document.getElementById("cart-count").innerHTML = cart.length;

/**
 * Thêm vào giỏ hàng
 */
const addToCart = async (i) => {
  try {
    const res = await fetch("http://localhost:3000/products/" + i);
    const data = await res.json();
    const selectProduct = await data;

    const product = {
      id: selectProduct.id,
      name: selectProduct.name,
      cate_id: selectProduct.cate_id,
      img: selectProduct.img,
      price: selectProduct.price,
      quantity: 1,
    };

    fetch("http://localhost:3000/cart/", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(product),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    alert("Thêm vào giỏ hàng thành công");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Xóa sản phẩm trong giỏ hàng
 */
const deleteCart = async (id) => {
  // console.log(id);

  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    fetch("http://localhost:3000/cart/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }
};

/**
 * Update số lượng sản phẩm và giá
 */
const updateProductTotal = async (id) => {
  const res = await fetch("http://localhost:3000/cart/" + id);
  const data = await res.json();
  const selectProduct = await data;
  let quantity = parseInt(document.getElementById(`quantity-${id}`).value);

  selectProduct.quantity = quantity;

  fetch("http://localhost:3000/cart/" + id, {
    headers: {
      "content-type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(selectProduct),
  })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

/**
 * Hiển thị danh sách danh mục ở select
 */
const showCateListMenu = (data) => {
  var list = document.querySelectorAll(".menu-cate");
  list.forEach((item) => {
    data.forEach((element) => {
      var cate = `
          <li>
          <a href="shop.html?id=${element.id}">${element.name}</a>
          </li>
          `;
      item.innerHTML += cate;
    });
  });
};

export async function getCategories(showCateList) {
  try {
    const res = await fetch("http://localhost:3000/category");
    const data = await res.json();
    // console.log(data);
    showCateListMenu(data);
    return data;
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
}
getCategories();

/**
 * Hiện thị danh sách sản phẩm
 */
const productList = document.querySelector(".product-list");
export const showProductList = (data) => {
  data.forEach((element) => {
    var prod = `
      <div class="product">
        <a href="product-details.html?id=${element.id}">
          <div class="overflow-hidden">
            <img src="${element.img}" alt="" />
            <img class="tag" src="../IMG/hot.png" alt="" />
          </div>
          <a href="#">${element.name}</a>
          <a class="category-link" href="">${element.cate_id}</a>
          <p>${element.price}đ</p>
          <button class="cartBtn" data="${element.id}">Thêm vào giỏ hàng</button>
        </a>
      </div>
          `;
    productList.innerHTML += prod;
  });
  let cartBtn = document.querySelectorAll(".cartBtn");
  cartBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      addToCart(parseInt(btn.getAttribute("data")));
    });
  });
};

/**
 * Lọc sản phẩm theo danh mục
 */
// Lấy param id từ url
const getCateId = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  // console.log(urlParams);
  return urlParams.get(param);
};
const id = getCateId("id");
if (id != null) {
  addToCart(id);
  /**
   * Lấy dữ liệu bảng sản phẩm từ API
   */
  async function getProducts(id) {
    try {
      const cate_res = await fetch("http://localhost:3000/category");
      const cate_data = await cate_res.json();
      let category = cate_data[id].name;

      const res = await fetch(
        "http://localhost:3000/products?cate_id=" + category
      );
      const data = await res.json();
      showProductList(data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  }
  getProducts(id);
} else {
  /**
   * Lấy dữ liệu bảng sản phẩm từ API
   */
  async function getProducts() {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      console.log(data);
      showProductList(data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  }
  getProducts();
}
// // /**
// //  * Hiển thị sản phẩm trong giỏ hàng
// //  */
// // var showCart = async (cart: any[]) => {
// //   const cartBody = document.getElementById("cart-body") as HTMLElement;

// //   cart.forEach((item) => {
// //     const cartItem = `<tr>
// //       <td class="product-remove">
// //         <button class="delete-cart" data="${item.id}">
// //           <img src="../IMG/trash-bin.png"/>
// //         </button>
// //       </td>
// //       <td class="product-thumb">
// //         <a href="product-details.html">
// //           <img src="${item.img}" alt="${item.name}" />
// //         </a>
// //       </td>
// //       <td class="product-name">
// //         <a href="product-details.html?id=${item.id}">${item.name}</a>
// //       </td>
// //       <td class="product-price">${item.price}</td>
// //       <td class="product-quantity">
// //         <input
// //           type="number"
// //           name="quantity"
// //           id="quantity-${item.id}"
// //           value="${item.quantity}"
// //           min="1"
// //           max="100"
// //           onchange="updateProductTotal(${item.id})"
// //         />
// //       </td>
// //       <td id="product-total-${item.id}"></td>
// //     </tr>`;
// //     cartBody.insertAdjacentHTML("beforeend", cartItem);
// //   });

// //   const deleteCartBtn = document.querySelectorAll(".delete-cart");
// //   deleteCartBtn.forEach((btn) => {
// //     btn.addEventListener("click", (event) => {
// //       event.preventDefault();

// //       // Get the data attribute value
// //       const dataValue = btn.getAttribute("data");

// //       // Check if dataValue is not null before parsing
// //       if (dataValue !== null) {
// //         deleteCart(parseInt(dataValue));
// //       } else {
// //         console.error("Data attribute 'data' is missing on the button.");
// //       }
// //     });
// //   });

// //   const cartBtn = document.querySelectorAll(".cartBtn");
// //   cartBtn.forEach((btn) => {
// //     btn.addEventListener("click", (event) => {
// //       event.preventDefault();

// //       // Get data attribute value
// //       const dataValue = btn.getAttribute("data");

// //       // Check if dataValue is not null before parsing
// //       if (dataValue !== null) {
// //         addToCart(parseInt(dataValue));
// //       } else {
// //         console.error("Data attribute 'data' is missing on the button.");
// //       }
// //     });
// //   });
// // };

// // /**
// //  * Thêm vào giỏ hàng
// //  */
// // const addToCart = async (i: number) => {
// //   try {
// //     const res = await fetch("http://localhost:3000/products/" + i);
// //     const data = await res.json();
// //     const selectProduct = data;

// //     const product: any = {
// //       id: selectProduct.id,
// //       name: selectProduct.name,
// //       cate_id: selectProduct.cate_id,
// //       img: selectProduct.img,
// //       price: selectProduct.price,
// //       quantity: 1,
// //     };

// //     fetch("http://localhost:3000/cart/", {
// //       headers: {
// //         "content-type": "application/json",
// //       },
// //       method: "POST",
// //       body: JSON.stringify(product),
// //     })
// //       .then((res) => {
// //         console.log(res);
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });

// //     alert("Thêm vào giỏ hàng thành công");
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // /**
// //  * Xóa sản phẩm trong giỏ hàng
// //  */
// // const deleteCart = async (id: number) => {
// //   if (confirm("Bạn có chắc chắn muốn xóa?")) {
// //     fetch("http://localhost:3000/cart/" + id, {
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       method: "DELETE",
// //     })
// //       .then((res) => console.log(res))
// //       .catch((error) => console.log(error));
// //   }
// // };

// // /**
// //  * Update số lượng sản phẩm và giá
// //  */
// // const updateProductTotal = async (id: number) => {
// //   const res = await fetch("http://localhost:3000/cart/" + id);
// //   const data = await res.json();
// //   const selectProduct = data;
// //   const quantity = parseInt(
// //     (document.getElementById(`quantity-${id}`) as HTMLInputElement).value
// //   );

// //   selectProduct.quantity = quantity;

// //   fetch("http://localhost:3000/cart/" + id, {
// //     headers: {
// //       "content-type": "application/json",
// //     },
// //     method: "PATCH",
// //     body: JSON.stringify(selectProduct),
// //   })
// //     .then((res) => console.log(res))
// //     .catch((error) => console.log(error));
// // };

// // /**
// //  * Hiển thị danh sách danh mục ở select
// //  */
// // const showCateListMenu = (data: any[]) => {
// //   const list = document.querySelectorAll(".menu-cate");
// //   list.forEach((item) => {
// //     data.forEach((element) => {
// //       const cate = `
// //           <li>
// //           <a href="shop.html?id=${element.id}">${element.name}</a>
// //           </li>
// //           `;
// //       item.innerHTML += cate;
// //     });
// //   });
// // };

// // async function getCategoriesList(showCateList: any) {
// //   try {
// //     const res = await fetch("http://localhost:3000/category");
// //     const data = await res.json();
// //     showCateListMenu(data);
// //     return data;
// //   } catch (error) {
// //     console.log("Error fetching categories:", error);
// //   }
// // }

// /**
//  * Hiển thị danh sách sản phẩm
//  */
// const alllist = document.querySelector("#alllist") as HTMLElement;
// const showProductList = (data: any[]) => {
//   // let lastFiveProducts = data.slice(-5);
//   data.forEach((element) => {
//     const prod = `
//       <div class="product">
//         <a href="product-details.html?id=${element.id}">
//           <div class="overflow-hidden">
//             <img src="${element.images[0].url}" alt="" />
//             <img class="tag" src="../IMG/hot.png" alt="" />
//           </div>
//           <a href="#">${element.name}</a>
//           <a class="category-link" href="">${element.category}</a>
//           <p>${element.price}đ</p>
//           <button class="cartBtn" data="${element.id}">Thêm vào giỏ hàng</button>
//         </a>
//       </div>
//           `;
//     alllist.innerHTML += prod;
//   });
// };

// /**
//  * Hiển thị danh sách 5 sản phẩm mới nhất
//  */
// const newlist = document.querySelector("#newlist") as HTMLElement;
// const show5newest = (data: any[]) => {
//   console.log(data);
//   data.forEach((element) => {
//     const prod = `
//       <div class="product">
//         <a href="product-details.html?id=${element.id}">
//           <div class="overflow-hidden">
//             <img src="${element.images[0].url}" alt="" />
//             <img class="tag" src="../IMG/hot.png" alt="" />
//           </div>
//           <a href="#">${element.name}</a>
//           <a class="category-link" href="">${element.category}</a>
//           <p>${element.price}đ</p>
//           <button class="cartBtn" data="${element.id}">Thêm vào giỏ hàng</button>
//         </a>
//       </div>
//           `;
//     newlist.innerHTML += prod;
//   });
// };

// /**
//  * Lọc sản phẩm theo danh mục
//  */
// const getCateId = (param: string) => {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get(param);
// };

// const id = getCateId("id");
// if (id != null) {
//   // addToCart(parseInt(id));
//   /**
//    * Lấy dữ liệu bảng sản phẩm từ API
//    */
//   async function getFilteredProducts(id: number) {
//     try {
//       const cate_res = await fetch("http://localhost:3000/category");
//       const cate_data = await cate_res.json();
//       const category = cate_data.find((c: any) => c.id === id).name;

//       const res = await fetch(
//         "http://localhost:3000/products?cate_id=" + category
//       );
//       const data = await res.json();
//       showProductList(data);
//     } catch (error) {
//       console.log("Error fetching categories:", error);
//     }
//   }
//   getFilteredProducts(parseInt(id));
// } else {
//   /**
//    * Lấy dữ liệu bảng sản phẩm từ API
//    */
//   async function getProducts() {
//     try {
//       const res = await fetch("http://localhost:3000/products");
//       const data = await res.json();
//       // console.log(data);
//       showProductList(data);
//       show5newest(data.slice(-5));
//     } catch (error) {
//       console.log("Error fetching categories:", error);
//     }
//   }
//   getProducts();
// }
