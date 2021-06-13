window.addEventListener("load", (event) => {
  function switchForm() {
    debugger;
    let infoForm = document.querySelectorAll(".contact-form");
    document.getElementById("login-h2").textContent = "Choose your role";
    infoForm.forEach((element) => {
      element.classList.toggle("form--hidden");
    });
  }

  const baseUrl = "http://localhost:16470/api";
  function login(event) {
    debugger;
    console.log(event.currentTarget);
    event.preventDefault();
    const url = `${baseUrl}/auth/Login`;

    if (!Boolean(event.currentTarget.userName.value)) {
      var usernameErrorElement = document.getElementById("login-errors");
      usernameErrorElement.textContent = "username is requered";
      usernameErrorElement.style.display = "block";
      return;
    }

    var data = {
      Email: event.currentTarget.userName.value,
      Password: event.currentTarget.password.value,
    };

    fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            debugger;
            sessionStorage.setItem("jwt", data.message);
            if (data.roles.length > 1) {
              switchForm();
            } else {
              if (data.roles[0] === "Admin") {
                window.location.href = "index.html";
              } else {
                window.location.href = "userArtistGallery.html";
              }
            }
          });
        } else {
          response.text().then((data) => {
            debugger;
            console.log(data);
            usernameErrorElement = document.getElementById("login-errors");
            usernameErrorElement.textContent = "Wrong username or password";
            usernameErrorElement.style.display = "block";
          });
        }
      })
      .catch((response) => {
        console.log(data);
      });
  }
  function goToPageByRole() {
    debugger;
    let form = document.getElementById("select-role-frm");
    event.preventDefault();
    let roleChosed = form.roleName.value;
    if (roleChosed === "admin") {
      window.location.href = "index.html";
    } else {
      window.location.href = "userArtistGallery.html";
    }
  }
  function goToCreateAccount() {
    window.location.href = "account-sign-up.html";
  }
  document
    .getElementById("create-artist-frm")
    .addEventListener("submit", login);
  document
    .getElementById("create-account-btn")
    .addEventListener("click", goToCreateAccount);

  document
    .getElementById("btn-select-role")
    .addEventListener("click", goToPageByRole);
});
