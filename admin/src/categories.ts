/**
 * Hiển thị danh sách danh mục
 */
const list = document.getElementById("alllist") as HTMLElement;

interface Category {
  id: string;
  name: string;
}

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

let categories: Category[] = [];
let cateCount = new Map<string, number>();
const formContainer = document.getElementById("editFormContainer");


async function fetchCategories(): Promise<void> {
  try {
    const res = await fetch("http://localhost:3000/categories");
    const data: Category[] = await res.json();
    categories = data;

    const Pres = await fetch("http://localhost:3000/products");
    const Pdata: Product[] = await Pres.json();

    // Tính tổng số sản phẩm của một danh mục
    cateCount.clear();
    Pdata.forEach((p) => {

      const cateName = p.category; // Use category name instead of ID
      cateCount.set(cateName, (cateCount.get(cateName) || 0) + 1);
    });

    showCateList(data, cateCount); // Pass the category count to the display function
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
}
fetchCategories();

const showCateList = (
  data: Category[],
  cateCount: Map<string, number>
): void => {
  list.innerHTML = ""; // Clear the list before appending new data
  data.forEach((element) => {
    const count = cateCount.get(element.name) || 0; // Get the count for the category
    const prod = `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${count}</td> <!-- Display the product count -->
                <td class="action-icons">
                  <button class="edit-btn" onclick="showEditCateForm('${element.id}')">Edit</button> /
                  <button class="delete-btn" onclick="deleteCate('${element.id}')">Delete</button>
                </td>
            </tr> 
        `;
    if (list) {
      list.innerHTML += prod;
    }
  });
};

/**
 * Thêm vào danh sách danh mujc
 */
async function postCategory(): Promise<void> {
  const newCateName = prompt("Add category name");

  if (!newCateName) {
    console.error("Name input is empty");
    alert("Category name cannot be empty.");
    return; // Exit the function if the name is empty
  }

  // Validation: Check if the name contains only letters
const validNamePattern = /^[A-Za-zÀ-ÿ]+$/; // Allow letters including Vietnamese characters

  if (!validNamePattern.test(newCateName.trim())) {
    console.error("Invalid category name");
    alert(
      "Category name must contain only letters and cannot include numbers, spaces, or special symbols."
    );
    return; // Exit the function if the name is invalid
  }

  let newCate: Category = {
    id: String(categories.length), // Use a timestamp for a unique ID
    name: newCateName,
  };

  try {
    const res = await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newCate),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add category");
    }

    const data = await res.json();
    console.log(data);
    alert("Category added successfully!");
    
    // Re-count products after adding new category
    const Pres = await fetch("http://localhost:3000/products");
    const Pdata: Product[] = await Pres.json();
    cateCount.clear();
    Pdata.forEach((p) => {
      const cateName = p.category;
      cateCount.set(cateName, (cateCount.get(cateName) || 0) + 1);
    });

  } catch (error) {
    console.error("Error adding category:", error);
    alert("Failed to add category. Please try again.");
  }
}

/**
 * Xóa danh mục
 */
const deleteCate = (id: string): void => {
  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    fetch("http://localhost:3000/categories/" + id, {
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
 * Function to redirect to add-product page and show editing product's details
 * @param id
 */
const showEditCateForm = async (id: string) => {
  const category = categories.find((e: Category) => e.id === id);
  if (!category) {
    alert("Category not found: " + id);
    return; // Prevent further execution if product not found
  }
  // Set product ID on form container
  if (formContainer) {
    formContainer.dataset.cateId = id;
  }

  // Fill the inline edit form
  (document.getElementById("editName") as HTMLInputElement).value =
    category.name;

  // Show the form
  if (formContainer) {
    (document.getElementById("category-main") as HTMLElement).style.display =
      "none";
    formContainer.style.display = "flex";
    // Create save button
    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.style.float = "right";
    saveBtn.textContent = "Save Changes";
    saveBtn.onclick = () => saveEditCate(id);

    // Create cancel button
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.style.float = "right";
    cancelBtn.style.marginRight = "10px";
    cancelBtn.style.backgroundColor = "transparent";
    cancelBtn.style.color = "var(--brand-color)";
    cancelBtn.textContent = "Cancel";
    cancelBtn.onclick = cancelEditCate;

    // Append buttons to form container
    formContainer.appendChild(saveBtn);
    formContainer.appendChild(cancelBtn);
  }
};

const saveEditCate = async (id: string) => {
  try {
    const name = (document.getElementById("editName") as HTMLInputElement)
      .value;

    if (!id) throw new Error("Category ID not found");

    // Create updated categories object
    const updatedCategory: Category = {
      id: id,
      name,
    };

    // Send PUT request to update product
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCategory),
    });

    if (!response.ok) throw new Error("Failed to update category");

    // Update local products array
    const index = categories.findIndex((c) => c.id === id);
    if (index !== -1) {
      categories[index] = updatedCategory;
    }

    // Refresh product list
    showCateList(categories, cateCount);


    // Hide form
    const formContainer = document.getElementById("editFormContainer");
    if (formContainer) {
      (document.getElementById("category-main") as HTMLElement).style.display =
        "none";
      formContainer.style.display = "none";
    }

    alert("Category updated successfully!");
  } catch (error) {
    console.error("Error updating category:", error);
    // alert("Failed to update category. Please try again.");
  }
};

const cancelEditCate = () => {
  const formContainer = document.getElementById("editFormContainer");
  if (formContainer) {
    formContainer.style.display = "none";
    (document.getElementById("category-main") as HTMLElement).style.display =
      "block";
  }
};
