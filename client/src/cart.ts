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

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: CartItem[];
}

let cartItems: CartItem[] = retrieveCart();

/**
 * Hiển thị sản phẩm trong giỏ hàng
 */
var renderCart = async (cart: CartItem[]) => {
  const cartBody = document.getElementById("cart-body") as HTMLElement;
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
          <img src="${item.images[0].url}" alt="${
        item.name
      }" width="100" height="100"/>
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
    let subtotal: number = 0;
    // let total: number = 0;
    let shippingFee: number = 20000;
    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    const subtotalP = document.getElementById("cart-subtotal") as HTMLElement;
    subtotalP.textContent = `${Intl.NumberFormat('de-DE').format(subtotal).toString()}₫`;

    const totalP = document.getElementById("cart-total") as HTMLElement;
    totalP.textContent = `${(Intl.NumberFormat('de-DE').format(subtotal + shippingFee)).toString()}₫`;
    
  } else {
    var row = document.createElement("tr");
    row.innerHTML = `
       <tr style="display: flex; text-align: center; padding: 10px" >
          Giỏ hàng trống
      </tr>
      `;
    cartBody.appendChild(row);
  }
};

const removeFromCart = (id: string) => {
  console.log("GOT IT");
  
  let cart: CartItem[] = retrieveCart();
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

const fetchOrder = async () => {
  const res = await fetch("http://localhost:3000/orders");
  const data = await res.json();
  return data;
};

const processOrder = async (event: Event) => {
  event.preventDefault();

  const customerName = (
    document.getElementById("customer-name") as HTMLInputElement
  ).value;
  const customerAddress = (
    document.getElementById("customer-address") as HTMLInputElement
  ).value;
  const customerPhone = (
    document.getElementById("customer-phone") as HTMLInputElement
  ).value;

  if (
    customerName.trim() === "" ||
    customerAddress.trim() === "" ||
    customerPhone.trim() === ""
  ) {
    alert("Vui lòng nhập đầy đủ thông tin khách hàng");
    return;
  }

  let cart: CartItem[] = retrieveCart();
  if (cart.length === 0) {
    alert("Giỏ hàng trống, vui lòng thêm sản phẩm vào giỏ hàng");
    return;
  }

  const order: Order = {
    id: "",
    customer: {
      name: customerName,
      address: customerAddress,
      phone: customerPhone,
    },
    items: cart,
  };

  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      alert("Đơn hàng đã được gửi thành công!");
      cart = [];
      storeCart(cart);
      renderCart(cart);
    } else {
      alert("Lỗi khi gửi đơn hàng!");
    }
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
  }
};

const orderSubmitBtn = document.getElementById(
  "submitBtn"
) as HTMLButtonElement;
if (orderSubmitBtn) {
  orderSubmitBtn.addEventListener("click", processOrder);
}

const fetchOrderData = async () => {
  const showOrders = document.getElementById("showOrders") as HTMLElement;
  if (!showOrders) {
    return;
  }
  try {
    const res = await fetch("http://localhost:3000/orders");
    const data = await res.json();

    if (data.length != 0) {
      showOrders.innerHTML = "";
      let orderHtml = "";

      data.forEach((element: Order) => {
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
  } catch (error) {
    console.error("Error fetching orders:", error);
    showOrders.innerHTML =
      '<p class="text-danger">Error loading orders. Please try again later.</p>';
  }
};

const updateProductTotal = (id: number) => {
  // Retrieve the current cart items
  let cart: CartItem[] = retrieveCart();

  // Find the item in the cart
  const item = cart.find((item) => item.id === id.toString());

  if (item) {
    // Get the new quantity from the input field
    const quantityInput = document.getElementById(
      `quantity-${item.id}`
    ) as HTMLInputElement;
    const newQuantity = parseInt(quantityInput.value);

    // Update the item's quantity
    item.quantity = newQuantity;

    // Update the total price displayed for this item
    const totalCell = quantityInput
      .closest("tr")
      ?.querySelector(".product-total") as HTMLElement;
    totalCell.textContent = (item.price * newQuantity).toString();

    // Update the cart in localStorage
    storeCart(cart);
    renderCart(cart);
  }
};

renderCart(cartItems);
fetchOrderData();
