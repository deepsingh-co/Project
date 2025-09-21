// Switch Tabs
function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => tab.classList.remove('active'));
  contents.forEach(content => content.classList.remove('active'));

  document.querySelector(`.tab[onclick="openTab('${tabId}')"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// Razorpay for demo (UPI & Card)
document.getElementById('upiPayBtn').onclick = function(){
  payWithRazorpay("UPI Payment");
}

document.getElementById('cardPayBtn').onclick = function(){
  payWithRazorpay("Card Payment");
}

document.getElementById('walletPayBtn').onclick = function(){
  payWithRazorpay("Wallet Payment");
}

function payWithRazorpay(type){
  var options = {
    "key": "YOUR_KEY_HERE",  // 👈 apna Razorpay key dalna
    "amount": 500 * 100,
    "currency": "INR",
    "name": "Scrap Uncle",
    "description": type,
    "handler": function (response){
        alert("✅ " + type + " Successful!\nPayment ID: " + response.razorpay_payment_id);
    },
    "theme": {
        "color": "#0072ff"
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
}

// Cash on Delivery
function cashOnDelivery(){
  alert("🚚 COD Selected!\nVendor will pay customer in cash.");
}
