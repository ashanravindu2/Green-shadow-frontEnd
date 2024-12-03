

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      links.forEach((l) => l.classList.remove("active-link"));
      this.classList.add("active-link");
    });
  });

  const toggleBtn = document.getElementById("toggle-btn");
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    content.classList.toggle("shifted");
  });
});




  const logoutButton = document.getElementById("logoutButton");
  const logoutModal = document.getElementById("logoutModal");
  const closeModal = document.querySelector(".close");
  const confirmLogout = document.getElementById("confirmLogout");
  const cancelLogout = document.getElementById("cancelLogout");

  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    logoutModal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    logoutModal.style.display = "none";
  });

  cancelLogout.addEventListener("click", () => {
    
    logoutModal.style.display = "none";
  });

  confirmLogout.addEventListener("click", () => {
    // Perform logout action here
    window.location.href = "/pages/signInPage.html"; // Redirect to logout page
  });

  window.addEventListener("click", (event) => {
    if (event.target == logoutModal) {
      logoutModal.style.display = "none";
    }
  });
