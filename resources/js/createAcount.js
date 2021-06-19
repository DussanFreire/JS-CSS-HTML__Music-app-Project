window.addEventListener("load", (event) => {
  const baseUrl = "http://localhost:16470/api/auth";
  async function createAccount(event) {
    try {
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
      let adminRole = "";
      let userRole = "";
      if (event.currentTarget.roleAdmin.checked) {
        adminRole = {
          UserName: event.currentTarget.userName.value,
          RoleName: "Admin",
        };
      }
      if (event.currentTarget.roleUser.checked) {
        userRole = {
          UserName: event.currentTarget.userName.value,
          RoleName: "User",
        };
      }
      if (
        event.currentTarget.roleUser.checked == false &&
        event.currentTarget.roleAdmin.checked == false
      ) {
        alert("At least one role must be choose");
        return;
      }

      let userReponse = await fetch(userUrl, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify(createUserData),
      });
      debugger;
      if (userReponse.status !== 200) {
        throw new Error(`Error (${response.status})`);
      }
      if (adminRole !== "") {
        let fetchedAdminRoles = await fetch(userRoleUrl, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(adminRole),
        });
      }

      if (userRole !== "") {
        let fetchedUserRoles = await fetch(userRoleUrl, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(userRole),
        });
      }
      alert("The user was created!");
      window.location.href = "login.html";
    } catch (error) {
      console.log(error);
    }
  }

  function goToCreateAccount() {
    window.location.href = "login.html";
  }
  document
    .getElementById("create-artist-frm")
    .addEventListener("submit", createAccount);
  document
    .getElementById("go-back")
    .addEventListener("click", goToCreateAccount);
});
