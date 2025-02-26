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

const alllist = document.querySelector("#alllist") as HTMLElement;
var currentPage = 1;
var productsPerPage = 10;
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

const getSelectedTags = () => {
  const checkboxes =
    document.querySelectorAll<HTMLInputElement>('input[name="tag"]');
  const selectedValues: string[] = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedValues.push(checkbox.value);
    }
  });
  return selectedValues;
};

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

const showProductList = (data: Product[]) => {
  var startIndex = (currentPage - 1) * productsPerPage;
  var endIndex = startIndex + productsPerPage;
  var pageProducts = data.slice(startIndex, endIndex);
  
  const productCountElement = document.getElementById("product-count");
  if (productCountElement) {
    productCountElement.textContent = `Showing ${
      startIndex + 1
    } to ${endIndex} of ${data.length} results`;
  }
  if (!alllist) return;

  var startIndex = (currentPage - 1) * productsPerPage;
  var endIndex = startIndex + productsPerPage;
  var pageProducts = data.slice(startIndex, endIndex);

  alllist.innerHTML = pageProducts
    .map(
      (element) => `
    <tr>
      <td>${element.id}</td>
      <td class="display-flex row-thumbnail">
        <img src="${element.images[0].url}" alt="" style="width: 50px" />
        <div class="row-thumbnail">
          <a>${element.name}</a>
          <span>${element.category}</span>
        </div>
      </td>
      <td style="color: var(--brand-color)">${element.stock}</td>
      <td>${element.price}</td>
      <td style="color: var(--brand-color)">${element.ordered}</td>
      <td><span>${element.likes}</span></td>
      <td>
        <button class="edit-btn" onclick="showEditForm('${element.id}')">Edit</button>
        <button class="delete-btn" onclick="deleteProduct('${element.id}')">Delete</button>

      </td>
    </tr>
  `
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
 * Function to call API and show products
 */
async function APIGetProducts() {
  try {
    const res = await fetch("http://localhost:3000/products");
    const data: Product[] = await res.json();
    products = data; // Store fetched products for pagination
    showProductList(data);
    // console.log(products);
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}
APIGetProducts();

/**
 * Function to redirect to add-product page and show editing product's details
 * @param id
 */
const showEditForm = async (id: string) => {
  const product = products.find((e: Product) => e.id === id);
  if (!product) {
    alert("Product not found: " + id);
    return; // Prevent further execution if product is not found
  }
  // Set product ID on form container
  const formContainer = document.getElementById("editFormContainer");
  if (formContainer) {
    formContainer.dataset.productId = id;
  }

  // Fill the inline edit form
  (document.getElementById("editName") as HTMLInputElement).value =
    product.name;
  (document.getElementById("editDescription") as HTMLInputElement).value =
    product.description;
  (document.getElementById("editImage") as HTMLInputElement).value =
    product.images[0].url;
  (document.getElementById("editStock") as HTMLInputElement).value =
    product.stock.toString();
  (document.getElementById("editPrice") as HTMLInputElement).value =
    product.price.toString();
  (document.getElementById("editCategory") as HTMLSelectElement).value =
    product.category.toString();

  // Set tags
  const tags = product.tags || [];
  (document.getElementById("editNewItem") as HTMLInputElement).checked =
    tags.includes("Món mới");
  (document.getElementById("editSignature") as HTMLInputElement).checked =
    tags.includes("Đặc trưng");
  (document.getElementById("editBestSeller") as HTMLInputElement).checked =
    tags.includes("Bán chạy");

  // Show the form
  if (formContainer) {
    (document.getElementById("products-main") as HTMLElement).style.display =
      "none";
    formContainer.style.display = "block";
    // Create save button
    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.style.float = "right";
    saveBtn.textContent = "Save Changes";
    saveBtn.onclick = () => saveEdit(id);

    // Create cancel button
    const cancelBtn = document.createElement("button");
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
};

const saveEdit = async (id: string) => {
  try {
    const name = (document.getElementById("editName") as HTMLInputElement)
      .value;
    const description = (
      document.getElementById("editDescription") as HTMLInputElement
    ).value;
    const image = (document.getElementById("editImage") as HTMLInputElement)
      .value;
    const stock = parseInt(
      (document.getElementById("editStock") as HTMLInputElement).value
    );
    const price = parseFloat(
      (document.getElementById("editPrice") as HTMLInputElement).value
    );
    const category = (
      document.getElementById("editCategory") as HTMLSelectElement
    ).value;

    // Validate inputs
    if (!name.trim()) {
      alert("Product name is required");
      return false;
    } else if (!description.trim()) {
      alert("Description is required");
      return false;
    } else if (!image.trim()) {
      alert("Image URL is required");
      return false;
    } else if (!category.trim() || category.trim() == "0") {
      alert("Category is required");
      return false;
    } else if (isNaN(stock) || stock <= 0) {
      alert("Quantity must be a positive number");
      return false;
    } else if (isNaN(price) || price <= 0) {
      alert("Price must be a positive number");
      return false;
    }

    // Get selected tags
    const tags: string[] = [];
    if ((document.getElementById("editNewItem") as HTMLInputElement).checked) {
      tags.push("Món mới");
    }
    if (
      (document.getElementById("editSignature") as HTMLInputElement).checked
    ) {
      tags.push("Đặc trưng");
    }
    if (
      (document.getElementById("editBestSeller") as HTMLInputElement).checked
    ) {
      tags.push("Bán chạy");
    }

    if (!id) throw new Error("Product ID not found");

    // Create updated product object
    const updatedProduct: Product = {
      id: id,
      name,
      description,
      category,
      price,
      stock,
      images: [{ url: image, alt: description || name }],
      tags,
      likes: products.find((p) => p.id == id)?.likes || 0,
      ordered: products.find((p) => p.id == id)?.ordered || 0,
      created_at: new Date().toISOString(),
    };

    // Send PUT request to update product
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) throw new Error("Failed to update product");

    // Update local products array
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = updatedProduct;
    }

    // Refresh product list
    showProductList(products);

    // Hide form
    const formContainer = document.getElementById("editFormContainer");
    if (formContainer) {
      (document.getElementById("products-main") as HTMLElement).style.display =
        "none";
      formContainer.style.display = "none";
    }

    alert("Product updated successfully!");
  } catch (error) {
    console.error("Error updating product:", error);
    alert("Failed to update product. Please try again.");
  }
};

const cancelEdit = () => {
  const formContainer = document.getElementById("editFormContainer");
  if (formContainer) {
    formContainer.style.display = "none";
    (document.getElementById("products-main") as HTMLElement).style.display =
      "block";
  }
};

/**
 * Function to delete product then redirect to show products page
 * @param id
 * @returns products page
 */
const deleteProduct = async (id: string) => {
  if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

  try {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });

    alert("Sản phẩm đã bị xóa!");
    window.location.href = "../views/add-product.html";
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
  }
};

/**
 * Function to add a product to json database then redirect to products show page
 */
const addProduct = async () => {
  try {
    // Get form elements
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const descInput = document.getElementById(
      "description"
    ) as HTMLInputElement;
    const imageInput = document.getElementById("image") as HTMLInputElement;
    const categoryInput = document.getElementById(
      "category"
    ) as HTMLInputElement;
    const stockInput = document.getElementById("stock") as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;

    // Validate inputs
    const name = nameInput.value.trim();
    const description = descInput.value.trim();
    const image = imageInput.value.trim();
    const category = categoryInput.value.trim();
    const stock = parseInt(stockInput.value);
    const price = parseFloat(priceInput.value);

    if (!name) {
      alert("Product name is required");
      return false;
    } else if (!description) {
      alert("Description is required");
      return false;
    } else if (!image) {
      alert("Image URL is required");
      return false;
    } else if (!category || category == "0") {
      alert("Category is required");
      return false;
    } else if (isNaN(stock) || stock <= 0) {
      alert("Quantity must be a positive number");
      return false;
    } else if (isNaN(price) || price <= 0) {
      alert("Price must be a positive number");
      return false;
    }

    // Create new id
    const lastProductId = parseInt(products[products.length - 1]?.id ?? "0");
    const newId = (lastProductId + 1).toString();
    // Create product object
    const newProduct: Product = {
      id: newId,
      name: name,
      description: description,
      images: [
        {
          url: image,
          alt: description,
        },
      ],
      category: category,
      stock: stock,
      price: price,
      tags: getSelectedTags(),
      likes: 0,
      ordered: 0,
      created_at: new Date().toISOString(),
    };
    // Send request
    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add product");
      // console.log(res);
    }
    if (res.ok) {
      window.location.href = "../views/products.html";
      alert("Product added successfully!");
      console.log(res);
      return true;
    }

    // Show success message and redirect
  } catch (error) {
    console.error("Error adding product:", error);
    alert(
      `Error: ${
        error instanceof Error ? error.message : "Failed to add product"
      }`
    );
  }
};
