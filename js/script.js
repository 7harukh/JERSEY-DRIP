let cart = [];

/* MENU */
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.style.left = menu.style.left === "0px" ? "-100%" : "0px";
}

/* SLIDER */
document.querySelectorAll(".slider").forEach(slider => {
  const imgs = slider.querySelectorAll("img");
  const dotsBox = slider.querySelector(".dots");

  imgs.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    dotsBox.appendChild(d);
  });
});

function nextSlide(btn) {
  slide(btn, 1);
}

function prevSlide(btn) {
  slide(btn, -1);
}

function slide(btn, dir) {
  const slider = btn.parentElement;
  const imgs = slider.querySelectorAll("img");
  const dots = slider.querySelectorAll(".dot");
  let index = [...imgs].findIndex(img => img.classList.contains("active"));

  imgs[index].classList.remove("active");
  dots[index].classList.remove("active");

  index = (index + dir + imgs.length) % imgs.length;

  imgs[index].classList.add("active");
  dots[index].classList.add("active");
}

/* CART */
function addToCart(name, price, btn) {
  const size = btn.parentElement.querySelector(".size").value;
  if (!size) return alert("Select size");

  cart.push({ name, price, size });
  document.getElementById("cartCount").innerText = cart.length;
}

function openCart() {
  const modal = document.getElementById("cartModal");
  const box = document.getElementById("cartItems");
  box.innerHTML = "";

  if (cart.length === 0) {
    box.innerText = "No items yet";
  } else {
    let msg = "Order Details:%0A";
    cart.forEach(i => {
      box.innerHTML += `<p>${i.name} (${i.size}) - ₹${i.price}</p>`;
      msg += `${i.name} (${i.size}) - ₹${i.price}%0A`;
    });
    document.getElementById("waCheckout").href =
      "https://wa.me/917006744346?text=" + msg;
  }

  modal.style.display = "flex";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

/* FILTER */
function filterCategory(cat, btn) {
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  document.querySelectorAll(".card").forEach(card => {
    card.style.display =
      cat === "all" || card.dataset.category.includes(cat) ? "block" : "none";
  });
}

/* SEARCH */
function searchProducts() {
  const val = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.dataset.name.includes(val) ? "block" : "none";
  });
}