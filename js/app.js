/* const loadDetails = () => {
  fetch('https://fakestoreapi.com/products/1')
    .then(res => res.json())
    .then((data) => showDetails(data));


}

const showDetails = (productDetails) => {
  console.log(productDetails);
  const detailsDiv = document.getElementById('showDetails');
  for (const details of productDetails) {
    detailsDiv.innerHTML = `
        <div  class="card h-100">
           <img src="${details.image}" class="card-img-top" alt="...">
             <div class="card-body">
              <h5 class="card-title">${details.category}</h5>
                      
           </div>
         </div>
         `;

  }
}

//  for single data*/




const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())

    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  // console.log(products);
  const allProducts = products.map((pd) => pd);

  for (const product of allProducts) {
    const image = product.image;
    // console.log(image);
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product text-left mx-5">
      <div>
        <img class="product-image" src="${image}""></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h4>${product.rating.count} People rate this  </h4>
      <h4> Customers Rating: ${product.rating.rate} <i class="fas fa-star text-success"></i> </h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button  onclick="loadDetails()" id="details-btn" class="btn btn-danger">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  console.log(id);
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
