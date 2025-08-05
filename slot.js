// let selectedSlot = null;
// const slots = document.querySelectorAll(".slot-card");

// slots.forEach(slot => {
//   slot.addEventListener("click", () => {
//     slots.forEach(s => s.classList.remove("selected"));
//     slot.classList.add("selected");
//     selectedSlot = slot.textContent;
//   });
// });

// // Dummy total amount
// document.getElementById("amountDisplay").textContent = localStorage.getItem("scrapTotal") || "0";

// function confirmSlot() {
//   const date = document.getElementById("pickupDate").value;
//   const note = document.querySelector(".address-box").value.trim();

//   if (!date || !selectedSlot) {
//     alert("Please select both date and time slot.");
//     return;
//   }

//   alert("Pickup booked for " + date + " at " + selectedSlot + (note ? ("\nNote: " + note) : ""));
// }

// //connecting the payment page



document.querySelectorAll(".slot-card").forEach(slot => {
  slot.addEventListener("click", () => {
    // Highlight selected slot
    document.querySelectorAll(".slot-card").forEach(s => s.classList.remove("selected"));
    slot.classList.add("selected");
    selectedSlot = slot.textContent;
  });
});
function confirmSlot() {
  const pickupDate = document.getElementById("pickupDate").value;
  const addressNote = document.querySelector(".address-box").value;

  if (!pickupDate || !selectedSlot) {
    alert("Please select both a date and a time slot.");
    return;
  }

  localStorage.setItem("pickupDate", pickupDate);
  localStorage.setItem("pickupTime", selectedSlot);
  localStorage.setItem("pickupNote", addressNote);

  window.location.href = "payment.html";
}


// total amount kho add krne ke liye

window.onload = function () {
  const amount = localStorage.getItem("scrapAmount") || "0";
  document.getElementById("amountDisplay").textContent = amount;
}
