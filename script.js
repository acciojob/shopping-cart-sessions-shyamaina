
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price} `;

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.className = "add-to-cart-btn";
    button.dataset.id = product.id;

    li.appendChild(button);
    productList.appendChild(li);
  });
}

function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price} `;

    const button = document.createElement("button");
    button.textContent = "Remove";
    button.addEventListener("click", () => removeFromCart(product.id));

    li.appendChild(button);
    cartList.appendChild(li);
  });
}

function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find((p) => p.id === Number(productId));

  if (product) {
    cart.push(product);
    saveCart();
    renderCart();
  }
}

function removeFromCart(productId) {
  const index = cart.findIndex((p) => p.id === Number(productId));

  if (index !== -1) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }
}

function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    addToCart(event.target.dataset.id);
  }
});

clearCartBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
