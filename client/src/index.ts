// import { parseDate } from "../index";
interface Product {
  id?: string;

  name: string;
  category: string;
  price: number;
  images: { url: string; alt: string }[];

  likes: number;
  ordered: number;
}

/**
 * Biến đổi kiểu date "dd/mm/yyyy" thành kiểu Date Object
 */
function parseDatee(date: string) {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day);
}
/**
 * Filter egg waffles/milk/tea
 */
async function threeColsFilter() {
  try {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    const sua_beo_container = document.getElementById("sua-beo") as HTMLElement;
    const banh_trung_container = document.getElementById(
      "banh_trung"
    ) as HTMLElement;
    const tra_thom_container = document.getElementById(
      "tra_thom"
    ) as HTMLElement;

    //Sắp xếp mảng sp theo "created_at"
    const sortedData = data.sort(
      (a: { created_at: string }, b: { created_at: string }) => {
        const aDate: Date = new Date(parseDatee(a.created_at));
        const bDate: Date = new Date(parseDatee(b.created_at));
        return bDate.getTime() - aDate.getTime();
      }
    );
    // Sữa béo
    let sua_beo: Product[] = sortedData.filter((item: Product) => {
      if (
        item.category == "Say Cheese THƠM BÉO" ||
        item.category == "Say Cheese ĐẬM VỊ"
      ) {
        return item;
      }
    });
    sua_beo.splice(3);
    sua_beo.forEach((element: Product) => {
      const prod = `
      <a href="product-details.html?id=${element.id}">
      <div class="best-prod" role="article">
      <div class="product">
        <div class="overflow-hidden">
          <img src="${element.images[0].url}" alt="${element.images[0].alt}" />
          <img class="tag" src="../images/hot.png" alt="Hot product tag" />
        </div>
        <div class="bst-prod-content">
          <a href="product-details.html?id=${element.id}">${element.name}</a>
           <a class="category-link" href="">${element.category}</a>
           <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" onclick="addProductToCart(${element.id})"><i class="bi bi-cart-fill"></i></button>
           </div>
         </div>
        </div>
      </div>
       </a>
      `;
      sua_beo_container.innerHTML += prod;
    });
    // Bánh Trứng
    let banh_trung: Product[] = sortedData.filter((item: Product) => {
      if (item.category == "Bánh Trứng Gà Non HongKong") {
        return item;
      }
    });
    banh_trung.splice(3);
    banh_trung.forEach((element: Product) => {
      const prod = `
      <a href="product-details.html?id=${element.id}">
      <div class="best-prod" role="article">
      <div class="product">
        <div class="overflow-hidden">
          <img src="${element.images[0].url}" alt="${element.images[0].alt}" />
          <img class="tag" src="../images/hot.png" alt="Hot product tag" />
        </div>
        <div class="bst-prod-content">
          <a href="product-details.html?id=${element.id}">${element.name}</a>
           <a class="category-link" href="">${element.category}</a>
                      <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" onclick="addProductToCart(${element.id})"><i class="bi bi-cart-fill"></i></button>
           </div>
         </div>
        </div>
      </div>
         </a>
      `;
      banh_trung_container.innerHTML += prod;
    });
    // Trà thơm
    let tra_thom: Product[] = sortedData.filter((item: Product) => {
      if (item.category == "Say Cheese THANH MÁT") {
        return item;
      }
    });
    tra_thom.splice(3);
    tra_thom.forEach((element: Product) => {
      const prod = `
        <a href="product-details.html?id=${element.id}">
    <div class="best-prod" role="article">
      <div class="product">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="${element.images[0].alt}" />
            <img class="tag" src="../images/hot.png" alt="Hot product tag" />
          </div>
          <div class="bst-prod-content">
            <a href="product-details.html?id=${element.id}">${element.name}</a>
            <a class="category-link" href="">${element.category}</a>
            <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" onclick="addProductToCart(${element.id})"><i class="bi bi-cart-fill"></i></button>
          </div>
         </div>
      </div>
    </div>
        </a>`;
      tra_thom_container.innerHTML += prod;
    });
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
}

/**
 * Fetch most liked products
 */
async function fetchMostlikesProducts() {
  try {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    const mostlikesContainer = document.getElementById(
      "alllist"
    ) as HTMLElement;

    const sortedData = data.sort((a: Product, b: Product) => b.likes - a.likes);

    sortedData.slice(0, 5).forEach((element: Product) => {
      const prod = `
      <a href="product-details.html?id=${element.id}">
        <div class="product" role="article">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="${element.images[0].alt}" />
          </div>
          <a href="product-details.html?id=${element.id}">${element.name}</a>
          <a class="category-link" href="">${element.category}</a>
          <p>${element.price}đ</p>
          <button class="cartBtn" onclick="addProductToCart(${element.id})">Thêm vào giỏ hàng</button>
        </div>
      </a>
`;
      mostlikesContainer.innerHTML += prod;
    });
  } catch (error) {
    console.log("Error fetching most likes products:", error);
  }
}

/**
 * Fetch most ordered products
 */
async function fetchBestSellingProducts() {
  try {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    const bestSellersContainer = document.querySelector(
      ".best-prod-list"
    ) as HTMLElement;

    const sortedData = data.sort(
      (a: Product, b: Product) => b.ordered - a.ordered
    );
    sortedData.slice(0, 6).forEach((element: Product) => {
      const prod = `<div class="best-prod" role="article">
        <div class="product">
        <a href="product-details.html?id=${element.id}">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="${element.images[0].alt}" />
            <img class="tag" src="../images/hot.png" alt="Hot product tag" />
          </div>
          <div class="bst-prod-content">
            <a href="">${element.name}</a>
            <a class="category-link" href="">${element.category}</a>
           <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" onclick="addProductToCart(${element.id})"><i class="bi bi-cart-fill"></i></button>
           </div>
          </div>
          </a>
        </div>
      </div>`;
      bestSellersContainer.innerHTML += prod;
    });
  } catch (error) {
    console.log("Error fetching best selling products:", error);
  }
}

threeColsFilter();
fetchMostlikesProducts();
fetchBestSellingProducts();


