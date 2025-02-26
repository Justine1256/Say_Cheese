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
const apiUrl = "http://localhost:5000/";
let statusData = [];
const getCart = () => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
};
const showCart = (cart) => {
    // Implementation of showCart function
};
const loadOrder = (data) => {
    console.log(data);
    const showOrders = document.getElementById("alllist");
    if (!showOrders) {
        console.log("Can't find #showOrders");
    }
    if (data.length == 0) {
        showOrders.innerHTML = "Không có đơn hàng nào.";
    }
    else {
        showOrders.innerHTML = "";
        let orderHtml = "";
        data.forEach((order) => {
            orderHtml = `<tr>
            <td>${order.id}</td>
            <td><a href="">${order.customer.name}</a></td>
            <td>Order's detail</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.items.reduce((total, item) => total + item.price * item.quantity, 0)}</td>
            <td>
              <select class="status-dropdown" style="border: none">
                ${statusData
                .map((status) => `<option value="${status.id}" ${order.status == status.id ? "selected" : ""}>
                    ${status.name}
                  </option>`)
                .join("")}
              </select>

            </td>
            <td>
              <button class="update-status edit-btn">Update</button>
            </td>
          </tr>`;
            showOrders.innerHTML += orderHtml;
        });
        console.log("Order display updated successfully");
    }
};
const fetchStatusData = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch("http://localhost:3000/status");
    statusData = yield res.json();
});
const getOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchStatusData();
    const res = yield fetch("http://localhost:3000/orders");
    const data = yield res.json();
    yield loadOrder(data);
    yield setupStatusUpdateHandlers();
    return data;
});
getOrder();
const setupStatusUpdateHandlers = () => {
    const updateButtons = document.querySelectorAll(".update-status");
    updateButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            if (!row) {
                console.error("Could not find table row");
                return;
            }
            const orderIdElement = row.querySelector("td:first-child");
            const statusElement = row.querySelector(".status-dropdown");
            if (!orderIdElement || !statusElement) {
                console.error("Could not find required elements");
                return;
            }
            const orderId = orderIdElement.textContent || "";
            const status = parseInt(statusElement.value);
            updateOrderStatus(orderId, status);
        });
    });
};
const getStatusName = (statusId) => {
    const status = statusData.find((s) => s.id === statusId);
    return status ? status.name : "Unknown";
};
const validateStatusTransition = (currentStatus, newStatus) => {
    return newStatus >= currentStatus;
};
const updateOrderStatus = (orderId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get current order status
        const orderResponse = yield fetch(`http://localhost:3000/orders/${orderId}`);
        const order = yield orderResponse.json();
        // Validate status transition
        if (!validateStatusTransition(order.status, newStatus)) {
            alert(`Cannot move status backward from ${order.status} to ${newStatus}`);
            throw new Error(`Cannot move status backward from ${order.status} to ${newStatus}`);
        }
        // Update status
        const response = yield fetch(`http://localhost:3000/orders/${orderId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });
        if (!response.ok) {
            throw new Error("Failed to update order status");
        }
        console.log(`Order ${orderId} status updated to ${newStatus}`);
        alert("Status updated successfully");
        yield getOrder();
    }
    catch (error) {
        console.error("Error updating order status:", error);
    }
});
