import { register } from "../service/reg_sign_model.js";

$(".register-btn").click(function () {
  event.preventDefault();
  const email = $("#email").val();
  const password = $("#password").val();

  const roleSelect = document.getElementById("role");
  const selectedRole = roleSelect.options[roleSelect.selectedIndex].value;

  console.log(email, password, selectedRole);

  const result = validation(email, password);

  if (result) {
    register(email, password, selectedRole, selectedRole)
      .then((response) => {
        const token = response.token;

        document.cookie = `authToken=${token}; max-age=3600; path=/; Secure; HttpOnly; SameSite=Strict`;
        console.log(`Cookie saved: authToken=${token}`);

        localStorage.setItem("userEmail", email);
        console.log(`User email saved: ${email}`);

        window.location.href = "/pages/signInPage.html";
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Registration failed. Please check your credentials and try again."
        );
      });
  }
});

// Validation function

// Validation function
function validation(email, password, selectedRole) {
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: "right",
      y: "top",
    },
    types: [
      {
        type: "warning",
        background: "orange",
        icon: {
          className: "material-icons",
          tagName: "i",
          text: "warning",
        },
      },
    ],
  });

  if (!$("#checkbox").prop("checked")) {
    notyf.error("Please accept the terms and conditions.");
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    notyf.error("Please enter a valid email address.");
    return false;
  }
  if (!password || password.length < 8) {
    notyf.error("Password must be at least 8 characters.");
    return false;
  } 
  
  else {
    return true;
  }
}
