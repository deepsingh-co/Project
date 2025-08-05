let itemTotal = 0;
const serviceCharge = 10;

function addToCart(button) {
  const card = button.parentElement;
  const input = card.querySelector('input');
  const weight = parseFloat(input.value);
  const rate = parseFloat(card.getAttribute('data-price'));

  if (!weight || weight <= 0) {
    alert("Please enter valid weight!");
    return;
  }

  const cost = weight * rate;
  itemTotal += cost;

  updateTotals();

  document.getElementById("itemTotal").textContent = itemTotal.toFixed(2);
  document.getElementById("grandTotal").textContent = (itemTotal + serviceCharge).toFixed(2);

  // ✅ Save to localStorage
  localStorage.setItem("scrapAmount", (itemTotal + serviceCharge).toFixed(2));

  input.value = '';
  button.textContent = "Added ✓";
  button.disabled = true;
  button.style.backgroundColor = "#9ca3af";

 
}

function addCustomScrap() {
  const name = document.getElementById("customName").value.trim();
  const weight = parseFloat(document.getElementById("customWeight").value);
  const rate = parseFloat(document.getElementById("customRate").value);

  if (!name || !weight || weight <= 0 || !rate || rate <= 0) {
    alert("Please fill all custom scrap details correctly.");
    return;
  }

  const cost = weight * rate;
  itemTotal += cost;

  updateTotals();

  alert(`${name} added to cart!`);

  // Reset fields
  document.getElementById("customName").value = '';
  document.getElementById("customWeight").value = '';
  document.getElementById("customRate").value = '';
}

function updateTotals() {
  document.getElementById("itemTotal").textContent = itemTotal.toFixed(2);
  document.getElementById("grandTotal").textContent = (itemTotal + serviceCharge).toFixed(2);
}

function proceed() {
  alert("Proceeding to time slot selection...");
  window.location.href = "slot.html";
}
