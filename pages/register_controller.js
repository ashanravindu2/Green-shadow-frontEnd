import { register } from '../service/reg_sign_model.js';

$('.register-btn').click(function() {
  event.preventDefault();
  const email = $('#email').val();
  const password = $('#password').val();
  const role = $('#role').val();

  console.log(email, password, role);

  const result = validation(email, password, role);

  if (result) {
   register(email, password, role).
   then((response) => {
    const token = response.token;
    document.cookie = `authToken=${token}; max-age=3600; path=/; Secure; HttpOnly; SameSite=Strict`;
    console.log(`Cookie saved: authToken=${token}`);

    window.location.href = "/pages/signInPage.html";
    
  })
  .catch((error) => {
    console.error(error);
    alert('Registration failed. Please check your credentials and try again.');
  
  });

  }

});



// Validation function

// Validation function
function validation(email, password, role) {
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
  if (!role || role === "default") {
    notyf.error("Please select a role.");
    return false;
  }
  else {
    return true;
  }

}


// async function success() {
//   const notyf = new Notyf({
//     duration: 3000,
//     position: {
//       x: "right",
//       y: "top",
//     },
//     types: [
//       {
//         type: "success",
//         background: "green",
//         icon: {
//           className: "material-icons",
//           tagName: "i",
//           text: "check_circle",
//         },
//       },
//     ],
//   });

//   notyf.success("User registered successfully.");
// }
 