// Menu Toggle
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('open');
}

// Filtering Jerseys
function filterJerseys(category) {
  const products = document.querySelectorAll('.product-card');
  products.forEach(product => {
    if (category === 'all' || product.dataset.category === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Cart Toggle
function toggleCart() {
  const cart = document.getElementById('cart');
  cart.classList.toggle('open');
}

// Add to Cart
let cart = [];

function addToCart(button) {
  const product = button.closest('.product-card');
  const size = product.querySelector('input[type="radio"]:checked');

  if (!size) {
    alert('Please select a size.');
    return;
  }

  const name = product.querySelector('h2').textContent;
  const price = product.querySelector('.new-price').textContent;
  cart.push({ name, size: size.value, price });
  
  updateCart();
}

function updateCart() {
  const cartItems = document.querySelector('.cart-items');
  const cartCount = document.querySelector('.cart-count');
  const totalElem = document.querySelector('.total');

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += parseInt(item.price.slice(1));
    cartItems.innerHTML += `<p>${item.name} - ${item.size} - ₹${item.price}</p>`;
  });

  cartCount.textContent = cart.length;
  totalElem.textContent = `Total: ₹${total}`;
}

// WhatsApp Checkout
function checkoutOnWhatsApp() {
  let message = 'Order from JERSEY DRIP:\n';
  let total = 0;

  cart.forEach(item => {
    message += `${item.name} - ${item.size} - ₹${item.price}\n`;
    total += parseInt(item.price.slice(1));
  });

  message += `Total: ₹${total}\nDelivery available across India.`;
  window.open(`https://wa.me/917006744346?text=${encodeURIComponent(message)}`);
}