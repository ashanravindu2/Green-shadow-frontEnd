import { login } from "../service/reg_sign_model.js";
import { saveCookie } from "../service/ToeknService.js";

$(".signIn-btn").click(function () {
  event.preventDefault();
  const email = $("#email").val();
  const password = $("#password").val();

  const result = validation(email, password);

  if (result) {
    login(email, password)
      .then((response) => {
        const token = response.token;
        saveCookie("authToken", token);
        console.log(`Cookie saved: authToken=${token}`);

        localStorage.setItem("userEmail", email);
        console.log(`User email saved: ${email}`);

        window.location.href = "/pages/dashboardMain.html";
      })
      .catch((error) => {
        console.error(error);
        passwordorEmailError(email, password);
      });
  }
});

// Validation function
function validation(email, password) {
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
  } else {
    return true;
  }
}

function passwordorEmailError(email, password) {
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

  if (!email || !password) {
    notyf.error("Please enter your email and password.");
  } else {
    notyf.error("Email or password is incorrect.");
  }
}


