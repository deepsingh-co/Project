function switchTab(tab) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const tabs = document.querySelectorAll(".tab");

  if (tab === "login") {
    loginForm.classList.add("active-form");
    signupForm.classList.remove("active-form");
    tabs[0].classList.add("active");
    tabs[1].classList.remove("active");
  } else {
    signupForm.classList.add("active-form");
    loginForm.classList.remove("active-form");
    tabs[1].classList.add("active");
    tabs[0].classList.remove("active");
  }
}
