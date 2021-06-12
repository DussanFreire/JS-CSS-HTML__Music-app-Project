window.addEventListener("load", (event) => {
  const baseUrl = "http://localhost:16470/api/auth";
  function login(event) {
    debugger;
    console.log(event.currentTarget);
    event.preventDefault();
    const userUrl = `${baseUrl}/User`;
    const userRoleUrl = `${baseUrl}/UserRole`;
    if (!Boolean(event.currentTarget.userName.value)) {
      var usernameErrorElement = document.getElementById("login-errors");
      usernameErrorElement.textContent = "username is requered";
      usernameErrorElement.style.display = "block";
      return;
    }

    var createUserData = {
      Email: event.currentTarget.userName.value,
      Password: event.currentTarget.password.value,
      ConfirmPassword: event.currentTarget.confirmPassword.value,
    };
    var createUserRoleData = {
      UserName: event.currentTarget.userName.value,
      RoleName: event.currentTarget.roleName.value,
    };

    fetch(userUrl, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(createUserData),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Error (${response.status})`);
        }
        return fetch(userRoleUrl, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(createUserRoleData),
        });
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Account created!");
          window.location.href = "login.html";
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  function goToCreateAccount() {
    window.location.href = "login.html";
  }
  document
    .getElementById("create-artist-frm")
    .addEventListener("submit", login);
  document
    .getElementById("go-back")
    .addEventListener("click", goToCreateAccount);
});
