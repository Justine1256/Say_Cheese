interface Product {
  id?: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: { url: string, alt: string }[];
  likes: number;
  tags: string[];
  created_at: string;
  ordered: number;
}

const alllist = document.querySelector("#alllist") as HTMLElement;

// Event delegation for edit/delete actions
document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  
  if (target.classList.contains('edit-btn')) {
    const productId = target.dataset.id;
    if (productId) {
      editProduct(productId);
    }
  }
  
  if (target.classList.contains('delete-btn')) {
    const productId = target.dataset.id;
    if (productId) {
      deleteProduct(productId);
    }
  }
});

const showProductList = (data: Product[]) => {
  if (!alllist) return;

  alllist.innerHTML = data.map(element => `
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
        <button class="edit-btn" data-id="${element.id}">Edit</button>
        <button class="delete-btn" data-id="${element.id}">Delete</button>
      </td>
    </tr>
  `).join('');
};

async function APIGetProducts() {
  try {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    showProductList(data);
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}

APIGetProducts();

const editProduct = async (id: string) => {
  // Implement edit functionality
  console.log(`Editing product ${id}`);
  // Redirect to edit page or show edit modal
};

const deleteProduct = async (id: string) => {
  if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

  try {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });

    alert("Sản phẩm đã bị xóa!");
    APIGetProducts(); // Refresh product list
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
  }
};

const addProduct = async () => {
  try {
    const name = (document.getElementById("product-name") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLInputElement).value;
    const image = (document.getElementById("image") as HTMLInputElement).value;
    const category = (document.getElementById("category") as HTMLInputElement).value;
    const quantity = (document.getElementById("quantity") as HTMLInputElement).value;
    const price = (document.getElementById("price") as HTMLInputElement).value;
    const tags = getSelectedTags();

    const newProduct: Product = {
      name,
      description,
      images: [{ url: image, alt: description || name }],
      category,
      stock: parseInt(quantity),
      price: parseFloat(price),
      tags,
      likes: 0,
      ordered: 0,
      created_at: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    window.location.href = "products.html";
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

const getSelectedTags = () => {
  const checkboxes = document.querySelectorAll<HTMLInputElement>('input[name="tag"]');
  const selectedValues: string[] = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedValues.push(checkbox.value);
    }
  });
  return selectedValues;
};
