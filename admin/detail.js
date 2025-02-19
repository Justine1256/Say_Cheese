/**
 * Lấy param id từ url
 */
const getProductId = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  // console.log(urlParams);
  return urlParams.get(param);
};
const id = getProductId("id");

/**
 * Hiển thị chi tiết sản phẩm
 */
const container = document.querySelector(".product-details");
const showDetails = (data) => {
  let details = `
    <div>
        <img src="${data.img}" width="500" height="400" />
        <div class="detail-img">
          <a href="">
            <img src="../IMG/detail-img.jpg" width="100" height="100" />
          </a>
          <a href="">
            <img src="../IMG/detail-img2.jpg" width="100" height="100" />
          </a>
          <a href="">
            <img src="../IMG/detail-img3.jpg" width="100" height="100" />
          </a>
          <a href="">
            <img src="../IMG/detail-img4.jpg" width="100" height="100" />
          </a>
        </div>
      </div>
      <div class="details">
        <div>
          <h1>${data.name}</h1>
          <p class="">${data.cate_id}</p>
          <div>
            <img src="../IMG/star.png" width="13" height="13" />
            <img src="../IMG/star.png" width="13" height="13" />
            <img src="../IMG/star.png" width="13" height="13" />
            <img src="../IMG/star.png" width="13" height="13" />
            <img src="../IMG/star.png" width="13" height="13" />
          </div>
          <p class="price">${data.price}</p>
          <p>${data.des}</p>
        </div>
        <div class="btn">
          <button>Mua ngay</button>
          <button>Thêm vào giỏ hàng</button>
        </div>
        <div class="prod-social">
          <a href="#" id="facebook">
            <img src="../IMG/facebook.png" width="13" height="13" />
            Like
          </a>
          <a href="#" id="twitter">
            <img src="../IMG/twitter.png" width="13" height="13" />
            Tweet
          </a>
          <a href="#" id="pinterest">
            <img src="../IMG/pinterest.png" width="13" height="13" />
            Save
          </a>
          <a href="#" id="instagram">
            <img src="../IMG/instagram.png" width="13" height="13" />
            Share
          </a>
          <a href="#" id="google-plus">
            <img src="../IMG/google-plus.png" width="16" height="16" />
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
async function getProducts() {
  try {
    const res = await fetch("http://localhost:3000/products/" + id);
    const data = await res.json();
    console.log(data);
    showDetails(data);
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
}
getProducts();
