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
  const itemsBox = document.getElementById("cartItems");
  const totalBox = document.getElementById("cartTotal");

  itemsBox.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    itemsBox.innerHTML = "<p>No items in cart</p>";
    totalBox.innerText = "0";
  } else {
    cart.forEach(item => {
      itemsBox.innerHTML += `
        <p>
          <strong>${item.name}</strong><br>
          Size: ${item.size} – ₹${item.price}
        </p>
      `;
      total += item.price;
    });

    totalBox.innerText = total;
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
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let message = "🛒 *Jersey Drip Order*%0A%0A";
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name}%0A`;
    message += `  Size: ${item.size} – ₹${item.price}%0A%0A`;
    total += item.price;
  });

  message += `*Total: ₹${total}*%0A%0A`;
  message += "Name:%0AAddress:%0APincode:";

  window.open(
    "https://wa.me/917006744346?text=" + message,
    "_blank"
  );
}