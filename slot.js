let selectedSlot = null;
const slots = document.querySelectorAll(".slot-card");

slots.forEach(slot => {
  slot.addEventListener("click", () => {
    slots.forEach(s => s.classList.remove("selected"));
    slot.classList.add("selected");
    selectedSlot = slot.textContent;
  });
});

// Dummy total amount
document.getElementById("amountDisplay").textContent = localStorage.getItem("scrapTotal") || "0";

function confirmSlot() {
  const date = document.getElementById("pickupDate").value;
  const note = document.querySelector(".address-box").value.trim();

  if (!date || !selectedSlot) {
    alert("Please select both date and time slot.");
    return;
  }

  alert("Pickup booked for " + date + " at " + selectedSlot + (note ? ("\nNote: " + note) : ""));
}
