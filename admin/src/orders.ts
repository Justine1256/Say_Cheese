const apiUrl = "http://localhost:5000/";

interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: { url: string; alt: string }[];
}
interface CartItem extends Product {
  quantity: number;
  status: string;
}
interface Status {
  id: number;
  name: string;
}

interface Order {
  id: string;
  customer: { name: string; address: string; phone: string };
  items: CartItem[];
  status: number;
  date: string;
}

let statusData: Status[] = [];


const getCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

const showCart = (cart: CartItem[]): void => {
  // Implementation of showCart function
};

const loadOrder = (data: Order[]) => {
  console.log(data);
  
  const showOrders = document.getElementById("alllist") as HTMLElement;
  if (!showOrders) {
    console.log("Can't find #showOrders");
  }
  if (data.length == 0) {
    showOrders.innerHTML = "Không có đơn hàng nào.";
  } else {
    showOrders.innerHTML = "";
    let orderHtml = "";

    data.forEach((order: Order) => {
      orderHtml = `<tr>
            <td>${order.id}</td>
            <td><a href="">${order.customer.name}</a></td>
            <td>Order's detail</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.items.reduce((total, item) => total + item.price * item.quantity, 0)}</td>
            <td>
              <select class="status-dropdown" style="border: none">
                ${statusData.map(status => 
                  `<option value="${status.id}" ${order.status == status.id ? "selected" : ""}>
                    ${status.name}
                  </option>`
                ).join('')}
              </select>

            </td>
            <td>
              <a>Edit</a> / <button class="update-status edit-btn">Update</button>
            </td>
          </tr>`;
      showOrders.innerHTML += orderHtml;
    });
    console.log("Order display updated successfully");
  }
};

const fetchStatusData = async () => {
  const res = await fetch("http://localhost:3000/status");
  statusData = await res.json();
};

const getOrder = async () => {
  await fetchStatusData();
  const res = await fetch("http://localhost:3000/orders");
  const data: Order[] = await res.json();
  await loadOrder(data);
  await setupStatusUpdateHandlers();
  return data;
};

getOrder();

const setupStatusUpdateHandlers = () => {
  const updateButtons = document.querySelectorAll(".update-status");

  updateButtons.forEach((button) => {
    button.addEventListener("click", function (this: HTMLButtonElement) {
      const row = this.closest("tr");
      if (!row) {
        console.error("Could not find table row");
        return;
      }

      const orderIdElement = row.querySelector("td:first-child");
      const statusElement = row.querySelector<HTMLSelectElement>(".status-dropdown");

      if (!orderIdElement || !statusElement) {
        console.error("Could not find required elements");
        return;
      }

      const orderId = orderIdElement.textContent || "";
      const status = parseInt(statusElement.value);


      updateOrderStatus(orderId, status)
        .then(() => {
          alert("Status updated successfully");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to update status");
        });
    });
  });
};

const getStatusName = (statusId: number): string => {
  const status = statusData.find(s => s.id === statusId);
  return status ? status.name : "Unknown";
};

const validateStatusTransition = (currentStatus: number, newStatus: number): boolean => {
  return newStatus >= currentStatus;
};



const updateOrderStatus = async (orderId: string, newStatus: number) => {

  try {
    // Get current order status
    const orderResponse = await fetch(`http://localhost:3000/orders/${orderId}`);
    if (!orderResponse.ok) {
      throw new Error("Failed to fetch order details");
    }
    const order: Order = await orderResponse.json();
    
    // Validate status transition
    if (!validateStatusTransition(order.status, newStatus)) {

      throw new Error(`Cannot move status backward from ${order.status} to ${newStatus}`);
    }

    // Update status
    const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    console.log(`Order ${orderId} status updated to ${newStatus}`);
    getOrder();
  } catch (error) {
    console.error("Error updating order status:", error);
    alert(error instanceof Error ? error.message : "Failed to update order status");
  }
};
