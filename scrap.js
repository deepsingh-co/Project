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

  document.getElementById("itemTotal").textContent = itemTotal.toFixed(2);
  document.getElementById("grandTotal").textContent = (itemTotal + serviceCharge).toFixed(2);

  input.value = '';
  button.textContent = "Added ✓";
  button.disabled = true;
  button.style.backgroundColor = "#9ca3af"; // grey out
}

function proceed() {
  alert("Proceeding to time slot selection...");
  // redirect to time slot page in next step
}
