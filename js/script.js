let cart = [];

document.addEventListener("DOMContentLoaded", () => {

  window.toggleMenu = function () {
    const menu = document.getElementById("sideMenu");
    menu.style.left = menu.style.left === "0px" ? "-260px" : "0px";
  };

  window.nextSlide = function (btn) {
    const slider = btn.parentElement;
    const imgs = slider.querySelectorAll("img");
    let i = [...imgs].findIndex(img => img.classList.contains("active"));
    imgs[i].classList.remove("active");
    imgs[(i + 1) % imgs.length].classList.add("active");
    updateDots(slider);
  };

  window.prevSlide = function (btn) {
    const slider = btn.parentElement;
    const imgs = slider.querySelectorAll("img");
    let i = [...imgs].findIndex(img => img.classList.contains("active"));
    imgs[i].classList.remove("active");
    imgs[(i - 1 + imgs.length) % imgs.length].classList.add("active");
    updateDots(slider);
  };

  document.querySelectorAll(".slider").forEach(slider => {
    const dots = slider.querySelector(".dots");
    slider.querySelectorAll("img").forEach((_, i) => {
      const d = document.createElement("div");
      d.className = "dot" + (i === 0 ? " active" : "");
      dots.appendChild(d);
    });
  });

  function updateDots(slider) {
    const imgs = slider.querySelectorAll("img");
    const dots = slider.querySelectorAll(".dot");
    let i = [...imgs].findIndex(img => img.classList.contains("active"));
    dots.forEach(d => d.classList.remove("active"));
    dots[i].classList.add("active");
  }

});

function addToCart(name, price, btn) {
  const size = btn.parentElement.querySelector(".size").value;
  if (!size) return alert("Select size first");
  cart.push({ name, price, size });
  document.getElementById("cartCount").innerText = cart.length;
}

function openCart() {
  document.getElementById("cartModal").style.display = "flex";
  const items = document.getElementById("cartItems");
  items.innerHTML = cart.length
    ? cart.map(i => `${i.name} (${i.size}) - ₹${i.price}`).join("<br>")
    : "No items yet";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function checkout() {
  if (!cart.length) return alert("Cart is empty");
  let msg = cart.map(i => `${i.name} (${i.size}) - ₹${i.price}`).join("%0A");
  window.open(`https://wa.me/917006744346?text=${msg}`);
}
// SEARCH FUNCTION
function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const name = card.getAttribute("data-name");
    if (!name) return;

    if (name.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}