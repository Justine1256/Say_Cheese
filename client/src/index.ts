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
 * Lọc sản phẩm bánh/trà/sữa
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
      const prod = `<div class="best-prod">
      <div class="product">
        <div class="overflow-hidden">
          <img src="${element.images[0].url}" alt="" />
          <img class="tag" src="../images/hot.png" alt="" />
        </div>
        <div class="bst-prod-content">
          <a href="">${element.name}</a>
           <a class="category-link" href="">${element.category}</a>
           <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" data="${element.id}"><i class="bi bi-cart-fill"></i></button>
           </div>
         </div>
        </div>
      </div>`;
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
      const prod = `<div class="best-prod">
      <div class="product">
        <div class="overflow-hidden">
          <img src="${element.images[0].url}" alt="" />
          <img class="tag" src="../images/hot.png" alt="" />
        </div>
        <div class="bst-prod-content">
          <a href="">${element.name}</a>
           <a class="category-link" href="">${element.category}</a>
                      <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" data="${element.id}"><i class="bi bi-cart-fill"></i></button>
           </div>
         </div>
        </div>
      </div>`;
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
      const prod = `<div class="best-prod">
      <div class="product">
        <div class="overflow-hidden">
          <img src="${element.images[0].url}" alt="" />
          <img class="tag" src="../images/hot.png" alt="" />
        </div>
        <div class="bst-prod-content">
          <a href="">${element.name}</a>
           <a class="category-link" href="">${element.category}</a>
           <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" data="${element.id}"><i class="bi bi-cart-fill"></i></button>
           </div>
         </div>
        </div>
      </div>`;
      tra_thom_container.innerHTML += prod;
    });
    console.log(sua_beo);
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
}

async function fetchMostlikesProducts() {
  try {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    const mostlikesContainer = document.getElementById(
      "alllist"
    ) as HTMLElement;

    const sortedData = data.sort((a: Product, b: Product) => b.likes - a.likes);
    console.log(sortedData);

    sortedData.slice(0, 5).forEach((element: Product) => {
      const prod = `<div class="product">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="" />
          </div>
          <a href="#">${element.name}</a>
          <a class="category-link" href="">${element.category}</a>
          <p>${element.price}đ</p>
          <button class="cartBtn" data="${element.id}">Thêm vào giỏ hàng</button>
        </div>`;
      mostlikesContainer.innerHTML += prod;
    });
  } catch (error) {
    console.log("Error fetching most likes products:", error);
  }
}

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
      const prod = `<div class="best-prod">
        <div class="product">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="" />
            <img class="tag" src="../images/hot.png" alt="" />
          </div>
          <div class="bst-prod-content">
            <a href="">${element.name}</a>
            <a class="category-link" href="">${element.category}</a>
           <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${element.price}đ</p>
            <button class="cartBtn" data="${element.id}"><i class="bi bi-cart-fill"></i></button>
           </div>
          </div>
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
