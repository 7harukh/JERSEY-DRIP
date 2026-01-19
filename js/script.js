let cart = [];

/* MENU */
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.style.left = menu.style.left === "0px" ? "-260px" : "0px";
}

/* SLIDER */
function nextSlide(btn) {
  const slider = btn.parentElement;
  const imgs = slider.querySelectorAll("img");
  let index = [...imgs].findIndex(img => img.classList.contains("active"));
  imgs[index].classList.remove("active");
  imgs[(index + 1) % imgs.length].classList.add("active");
  updateDots(slider);
}

function prevSlide(btn) {
  const slider = btn.parentElement;
  const imgs = slider.querySelectorAll("img");
  let index = [...imgs].findIndex(img => img.classList.contains("active"));
  imgs[index].classList.remove("active");
  imgs[(index - 1 + imgs.length) % imgs.length].classList.add("active");
  updateDots(slider);
}

/* DOTS */
document.querySelectorAll(".slider").forEach(slider => {
  const dotsBox = slider.querySelector(".dots");
  const imgs = slider.querySelectorAll("img");

  imgs.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    dotsBox.appendChild(d);
  });
});

function updateDots(slider) {
  const imgs = slider.querySelectorAll("img");
  const dots = slider.querySelectorAll(".dot");
  let index = [...imgs].findIndex(img => img.classList.contains("active"));
  dots.forEach(d => d.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}

/* CART */
function addToCart(name, price, btn) {
  const card = btn.closest(".card");
  const size = card.querySelector(".size").value;
  if (!size) return alert("Please select size");

  cart.push({ name, price, size });
  document.getElementById("cartCount").innerText = cart.length;
}

function openCart() {
  const modal = document.getElementById("cartModal");
  const box = document.getElementById("cartItems");

  if (cart.length === 0) {
    box.innerText = "No items yet";
  } else {
    box.innerHTML = cart.map(
      i => `${i.name} (${i.size}) - ₹${i.price}`
    ).join("<br>");
  }
  modal.style.display = "flex";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

/* SIZE GUIDE */
function openSizeGuide() {
  document.getElementById("sizeGuide").style.display = "flex";
}
function closeSizeGuide() {
  document.getElementById("sizeGuide").style.display = "none";
}

/* FILTER */
function filterCategory(cat) {
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");

  document.querySelectorAll(".card").forEach(card => {
    if (cat === "all" || card.dataset.category.includes(cat)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

/* SEARCH */
function searchProducts() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.dataset.name.includes(q) ? "block" : "none";
  });
}

/* WHATSAPP */
function checkoutWhatsApp() {
  if (cart.length === 0) return alert("Cart is empty");

  let msg = "Hello Jersey Drip 👋%0A%0AOrder Details:%0A";
  cart.forEach(i => {
    msg += `• ${i.name} (${i.size}) - ₹${i.price}%0A`;
  });

  window.open("https://wa.me/917006744346?text=" + msg, "_blank");
}