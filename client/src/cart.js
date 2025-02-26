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
let cartItems = retrieveCart();
/**
 * Hiển thị sản phẩm trong giỏ hàng
 */
var renderCart = (cart) => __awaiter(void 0, void 0, void 0, function* () {
    const cartBody = document.getElementById("cart-body");
    cartBody.innerHTML = '';
    if (cart.length > 0) {
        cart.forEach((item) => {
            const cartItem = `<tr>
      <td class="product-remove">
        <button class="delete-cart" onclick="removeFromCart(${item.id})">
          <i class="bi bi-trash3-fill"></i>
        </button>
      </td>
      <td class="cart-item-img">
        <a href="product-details.html">
          <img src="${item.images[0].url}" alt="${item.name}" width="100" height="100"/>
        </a>
      </td>
      <td class="product-name">
        <a href="product-details.html?id=${item.id}">${item.name}</a>
      </td>
      <td class="product-price">${Intl.NumberFormat('de-DE').format(item.price)}</td>
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
      <td class="product-total">${Intl.NumberFormat('de-DE').format(item.quantity * item.price)}</td>
    </tr>`;
            cartBody.insertAdjacentHTML("beforeend", cartItem);
        });
        // Count cart subtotal and total
        let subtotal = 0;
        // let total: number = 0;
        let shippingFee = 20000;
        cart.forEach((item) => {
            subtotal += item.price * item.quantity;
        });
        const subtotalP = document.getElementById("cart-subtotal");
        subtotalP.textContent = `${Intl.NumberFormat('de-DE').format(subtotal).toString()}₫`;
        const totalP = document.getElementById("cart-total");
        totalP.textContent = `${(Intl.NumberFormat('de-DE').format(subtotal + shippingFee)).toString()}₫`;
    }
    else {
        var row = document.createElement("tr");
        row.innerHTML = `
       <tr style="display: flex; text-align: center; padding: 10px" >
          Giỏ hàng trống
      </tr>
      `;
        cartBody.appendChild(row);
    }
});
const removeFromCart = (id) => {
    console.log("GOT IT");
    let cart = retrieveCart();
    cart = cart.filter((item) => item.id != id);
    console.log(cart);
    storeCart(cart);
    renderCart(cart);
};
// const displayCart = (cart: CartItem[]) => {
//   if (!cartTable) {
//     return;
//   }
//   let totalPrice = 0;
//   cartTable.innerHTML = "";
//   if (cart.length > 0) {
//     cart.forEach((item) => {
//       var row = document.createElement("tr");
//       row.innerHTML = `
//        <tr>
//           <td>${item.id}</td>
//           <td><img src="${item.images[0].url}" width="50" height="50"></td>
//           <td>${item.name}</td>
//           <td>${item.price}</td>
//           <td>${item.quantity}</td>
//           <td>${item.price * item.quantity}</td>
//       </tr>
//       `;
//       cartTable.appendChild(row);
//       totalPrice += item.price * item.quantity;
//     });
//     const totalPriceElement = document.querySelector(".cart-amount#cart-total") as HTMLElement;
//     const shippingFee = 20000;
//     const totalWithShipping = totalPrice + shippingFee;
//     totalPriceElement.textContent = `Tổng tiền: ${totalWithShipping}`;
//   }
// };
const fetchOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch("http://localhost:3000/orders");
    const data = yield res.json();
    return data;
});
const processOrder = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const customerName = document.getElementById("customer-name").value;
    const customerAddress = document.getElementById("customer-address").value;
    const customerPhone = document.getElementById("customer-phone").value;
    if (customerName.trim() === "" ||
        customerAddress.trim() === "" ||
        customerPhone.trim() === "") {
        alert("Vui lòng nhập đầy đủ thông tin khách hàng");
        return;
    }
    let cart = retrieveCart();
    if (cart.length === 0) {
        alert("Giỏ hàng trống, vui lòng thêm sản phẩm vào giỏ hàng");
        return;
    }
    const order = {
        id: "",
        customer: {
            name: customerName,
            address: customerAddress,
            phone: customerPhone,
        },
        items: cart,
    };
    try {
        const response = yield fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });
        if (response.ok) {
            alert("Đơn hàng đã được gửi thành công!");
            cart = [];
            storeCart(cart);
            renderCart(cart);
        }
        else {
            alert("Lỗi khi gửi đơn hàng!");
        }
    }
    catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
    }
});
const orderSubmitBtn = document.getElementById("submitBtn");
if (orderSubmitBtn) {
    orderSubmitBtn.addEventListener("click", processOrder);
}
const fetchOrderData = () => __awaiter(void 0, void 0, void 0, function* () {
    const showOrders = document.getElementById("showOrders");
    if (!showOrders) {
        return;
    }
    try {
        const res = yield fetch("http://localhost:3000/orders");
        const data = yield res.json();
        if (data.length != 0) {
            showOrders.innerHTML = "";
            let orderHtml = "";
            data.forEach((element) => {
                orderHtml = `
      <div class="d-flex py-3 border-bottom border-secondary">
        <div class="w-25">
          <h6>Tên khách hàng:</h6>
          <p>${element.customer.name}</p>
          <h6>Địa chỉ:</h6>
          <p>${element.customer.address}</p>
          <h6>Số điện thoại:</h6>
          <p>${element.customer.phone}</p>
        </div>
        <table class="w-75">
          <thead>
            <tr class="bg-body-secondary">
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>`;
                element.items.forEach((item) => {
                    orderHtml += `
          <tr class="border">
            <td><img src="${item.images[0].url}" width="50" height="50"></td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.price * item.quantity}</td>
          </tr>
      </div>`;
                });
                showOrders.innerHTML += orderHtml;
            });
        }
        console.log("Order display updated successfully");
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        showOrders.innerHTML =
            '<p class="text-danger">Error loading orders. Please try again later.</p>';
    }
});
const updateProductTotal = (id) => {
    var _a;
    // Retrieve the current cart items
    let cart = retrieveCart();
    // Find the item in the cart
    const item = cart.find((item) => item.id === id.toString());
    if (item) {
        // Get the new quantity from the input field
        const quantityInput = document.getElementById(`quantity-${item.id}`);
        const newQuantity = parseInt(quantityInput.value);
        // Update the item's quantity
        item.quantity = newQuantity;
        // Update the total price displayed for this item
        const totalCell = (_a = quantityInput
            .closest("tr")) === null || _a === void 0 ? void 0 : _a.querySelector(".product-total");
        totalCell.textContent = (item.price * newQuantity).toString();
        // Update the cart in localStorage
        storeCart(cart);
        renderCart(cart);
    }
};
renderCart(cartItems);
fetchOrderData();
