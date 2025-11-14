document.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  if (window.scrollY > 4) {
    header.classList.add("site-header--scrolled");
  } else {
    header.classList.remove("site-header--scrolled");
  }
});


