/**
 * Interface for Product Data
 */
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
/**
 * Hiển thị danh sách sản phẩm
 */
const alllist = document.querySelector("#alllist") as HTMLElement;

/**
 * Hiển thị danh sách danh mục ở select
 */
const showCateListMenu = (data: any[]) => {
  const list = document.querySelectorAll(".menu-cate");
  list.forEach((item) => {
    data.forEach((element) => {
      const cate = `
            <li>
            <a href="shop.html?id=${element.id}">${element.name}</a>
            </li>
            `;
      item.innerHTML += cate;
    });
  });
};

/**
 * Lấy dữ liệu bảng danh mục từ API và chạy hàm showCateListMenu
 */
async function getCategories() {
  try {
    const res = await fetch("http://localhost:3000/category");
    const data = await res.json();
    showCateListMenu(data);
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
}

/**
 * Lấy param id từ url
 */
const getProductId = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

const id: string | null = getProductId("id");

/**
 * Hiển thị chi tiết sản phẩm
 */
const container = document.querySelector(".product-details") as HTMLElement;

const showDetails = (data: Product): void => {
  let details = `
  <div>
      <img src="${data.images[0].url}" width="500" height="400" />
      <div class="detail-img">
        <a href="">
          <img src="../images/detail-img.jpg" width="100" height="100" />
        </a>
        <a href="">
          <img src="../images/detail-img2.jpg" width="100" height="100" />
        </a>
        <a href="">
          <img src="../images/detail-img3.jpg" width="100" height="100" />
        </a>
        <a href="">
          <img src="../images/detail-img4.jpg" width="100" height="100" />
        </a>
      </div>
    </div>
    <div class="details">
      <div>
        <h1>${data.name}</h1>
        <p class="">${data.category}</p>
        <div>
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
        </div>
        <p class="price">${data.price}</p>
        <p>${data.description}</p>
      </div>
      <div class="btn">
        <button>Mua ngay</button>
        <button class="cartBtn" onclick="addProductToCart(${data.id})">Thêm vào giỏ hàng</button>
      </div>
      <div class="prod-social">
        <a href="#" id="facebook">
          <img src="../images/facebook.png" width="13" height="13" />
          Like
        </a>
        <a href="#" id="twitter">
          <img src="../images/twitter.png" width="13" height="13" />
          Tweet
        </a>
        <a href="#" id="pinterest">
          <img src="../images/pinterest.png" width="13" height="13" />
          Save
        </a>
        <a href="#" id="instagram">
          <img src="../images/instagram.png" width="13" height="13" />
          Share
        </a>
        <a href="#" id="google-plus">
          <img src="../images/google-plus.png" width="16" height="16" />
          Share
        </a>
      </div>
    </div>
  `;
  container.innerHTML = details;
};

/**
 * Lấy dữ liệu chi tiết sản phẩm theo id
 */
async function getProductsDetails(): Promise<void> {
  if (!id) {
    console.log("Product ID is not available.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/products/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data: Product = await res.json();
    showDetails(data);
  } catch (error) {
    console.log("Error fetching product details:", error);
  }
}

getProductsDetails();

/**
 * Event listener for add to cart button
 */
const cartBtn = document.querySelectorAll(".cartBtn");
cartBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log("GOT IT");
    event.preventDefault();
    const dataValue = btn.getAttribute("data");
    if (dataValue !== null) {
      addProductToCart(dataValue);
    } else {
      console.error("Data attribute 'data' is missing on the button.");
    }
  });
});

const retrieveCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

const storeCart = (cart: CartItem[]): void => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

/**
 * Get product's id and add it to the cart
 * @param id : product id
 */
const addProductToCart = async (id: string) => {
  try {
    let cart: CartItem[] = retrieveCart();
    const res = await fetch("http://localhost:3000/products");
    const productlist: Product[] = await res.json();
    var existingItem = cart.filter((item) => item.id == id);
    if (existingItem.length == 1) {
      cart.map((item) => {
        if (item.id == id) {
          item.quantity++;
        }
      });
    } else {
      const product = productlist.filter((item) => item.id == id) as Product[];
      const cartProduct: CartItem = {
        id: product[0]?.id || "",
        name: product[0]?.name || "",
        price: product[0]?.price || 0,
        description: product[0]?.description || "",
        category: product[0]?.category || "",
        images: product[0]?.images || [],
        quantity: 1,
        stock: product[0]?.stock || 0,
        likes: product[0]?.likes || 0,
        tags: product[0]?.tags || [],
        created_at: product[0]?.created_at || "",
        ordered: product[0]?.ordered || 0,
      };
      if (cartProduct) {
        cart.push(cartProduct);
      } else {
        throw new Error("Product not found");
      }
    }
    storeCart(cart);
    alert("Thêm vào giỏ hàng thành công!");
    // renderCart(cart);
  } catch (error) {
    alert("Lỗi khi thêm vào giỏ hàng:");
    console.error(error);
  }
};
