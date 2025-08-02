document.querySelectorAll('.accept').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Order Accepted ✅');
  });
});

document.querySelectorAll('.reject').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Order Rejected ❌');
  });
});
