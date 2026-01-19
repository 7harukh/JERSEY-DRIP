let cart = [];

/* MENU */
function toggleMenu() {
  const menu = document.getElementById("side-menu");
  menu.style.left = menu.style.left === "0px" ? "-250px" : "0px";
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
  const size = card.querySelector(".size-select").value;
  if (!size) {
    alert("Please select size");
    return;
  }
  cart
