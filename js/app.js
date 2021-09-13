// Get products by Api and load in website
const loadProducts = () => {
  const searchField = document.getElementById('input-field');
  const searchText = searchField.value;
  searchField.value = "";

  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;
  // https://fakestoreapi.com/products
  fetch(url)
    .then((response) => response.json())

    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    //  Get image dynamically
    const image = product.image;
    //  Get Rating dynamically
    const rating = product.rating.rate;
    const div = document.createElement("div");
    div.classList.add("product");
    // Creating cart dynamically 
    div.innerHTML = `<div class="single-product text-center">
      <div>
        <img class="product-image" src="${image}"></img>
      </div>
      <h4 class="Text-center">${product.title}</h4>
      <p>Category: ${product.category}</p> 
      <h4>${product.rating.count} People rate this  </h4>
      <h4> Customers Rating: ${rating}/5</h4>
      <div class="stars-outer">
       <div class="stars-inner" style="width:${((rating / 5) * 100)}%"></div></div>  
      <h2>Price: $ ${product.price}</h2>
      <footer class="card-footer">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button  onclick="loadDetails()" id="details-btn" class="btn btn-primary">Details</button>
      </footer>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


//////////// Cart Section ///////////////
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
