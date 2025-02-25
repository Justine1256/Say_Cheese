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
const showProductList = (data: any[]) => {
  if (!alllist) {
    console.log("Element '#alllist' not found");
    return;
  }
  data.forEach((element) => {
    const prod = `
      <div class="product">
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
      </div>
          `;
    alllist.innerHTML += prod;
  });
};

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
        <button>Thêm vào giỏ hàng</button>
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
    console.log(data);
    showDetails(data);
  } catch (error) {
    console.log("Error fetching product details:", error);
  }
}

getProductsDetails();
