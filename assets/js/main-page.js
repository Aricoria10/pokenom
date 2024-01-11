// Add 'active' class to the current page's link
const currentUrl = window.location.pathname;
const links = document.querySelectorAll(".nav-mobile a");

links.forEach((link) => {
  if (link.getAttribute("href") === currentUrl) {
    link.classList.add("active");
  }
});
