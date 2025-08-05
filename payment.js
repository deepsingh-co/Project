window.onload = function () {
  // Fetch from localStorage
  const pickupDate = localStorage.getItem("pickupDate") || "Not selected";
  const pickupTime = localStorage.getItem("pickupTime") || "Not selected";
  const pickupNote = localStorage.getItem("pickupNote") || "Not provided";
  const scrapAmount = localStorage.getItem("scrapAmount") || "0";

  // Insert into page
  document.getElementById("pickupDateDisplay").textContent = pickupDate;
  document.getElementById("pickupTimeDisplay").textContent = pickupTime;
  document.getElementById("pickupNoteDisplay").textContent = pickupNote;
  document.getElementById("scrapAmountDisplay").textContent = parseFloat(scrapAmount).toFixed(2);
};
