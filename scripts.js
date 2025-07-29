function selectRole(role) {
  if (role === 'customer') {
    window.location.href = 'customer-login.html';
  } else {
    window.location.href = 'vendor-login.html';
  }
}
