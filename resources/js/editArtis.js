if (!Boolean(sessionStorage.getItem("jwt"))) {
  window.location.href = "login.html";
}
const baseRawUrl = "http://localhost:16470";
const baseUrl = baseRawUrl + "/api";
var queryParams = window.location.search.split("?");
var artistId = queryParams[1].split("=")[1];
const url = `${baseUrl}/artists/${artistId}`;

function GoToArtists(event) {
  // debugger;
  window.location.href = `index.html#artsts-added`;
}
function formatDate(dateStr) {
  dateDivided = dateStr.slice(0, 10).split("-");
  return `${dateDivided[2]}-${dateDivided[1]}-${dateDivided[0]}`;
}
function createInfoForm(artist) {
  return `<section id="new-artist" class="artist-section setting-form">
  <div class="form">
    <div class="row">
    </div>
    <div class="row">
      <form
        id="edit-artist-form"
        method="post"
        action="#"
        class="contact-form"
      >
        <div class="row">
          <div class="col span-1-of-3">
            <label for="nombre">Name</label>
          </div>
          <div class="col span-2-of-3">
            <input
              type="text"
              name="name"
              value="${artist.name}" 
              placeholder="Artist real name"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col span-1-of-3">
            <label for="artisticName">Artistic Name</label>
          </div>
          <div class="col span-2-of-3">
            <input
              type="text"
              value="${artist.artisticName}"
              name="artisticName"
              placeholder="Artist artistic name"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col span-1-of-3">
            <label for="artistDescription">Description</label>
          </div>
          <div class="col span-2-of-3">
            <input
              type="text"
              value="${artist.artistDescription}"
              name="artistDescription"
              placeholder="Artist description"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col span-1-of-3">
            <label for="bornDate">Born Date</label>
          </div>
          <div class="col span-2-of-3">
            <input 
              type="date" 
              value="${artist.bornDate.slice(0, 10)}" 
              name="bornDate" required 
             />
          </div>
        </div>
       
      </form>
    </div>
</section>

`;
}
function createImgForm(artist) {
  return `    <section id="new-artist" class="artist-section setting-form form--hidden">
  <div class="form">
    <div class="row">
    </div>
    <div class="row">
      <form
        id="edit-artist-img-form"
        method="post"
        action="#"
        class="contact-form"
      >
        <div class="row">
          <div class="col span-1-of-3">
            <label for="Image">Image</label>
          </div>
          <div class="col span-2-of-3">
            <input
              type="file"
              value="${artist.imagePath}"
              placeholder="Image"
              name="image"
              required
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</section>`;
}

function createAlbumHTML(album) {
  const imageUrl = album.imagePath ? `${baseRawUrl}/${album.imagePath}` : "";
  return `<div class="plan-box album-photo">
  <img src="${imageUrl}" alt="album" />
  <p class="artist-name"> ${album.name}</p>
  <ul>
    <li>
      <strong>Release Date</strong>: ${formatDate(album.releaseDate)}
    </li>
    <li>
      <strong>Album Description</strong>: ${album.albumDescription}
    </li>
  </ul>

  <div class="btn-container">
    <button
      class="btn btn-full"
      href="#clasicas"
      type="button"
      data-edit-album-id="${album.id}"
    >
      EDIT
    </button>
    <button
      class="btn btn-ghost"
      href="#clasicas"
      type="button"
      data-delete-album-id="${album.id}"
    >
      DELETE
    </button>
  </div>
</div>`;
}

function searchFunction() {
  var input, filter, divContent, txtValue, planBoxes, name;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  divContent = document.querySelector(".list-not-empty");
  planBoxes = divContent.querySelectorAll(".plan-box");
  for (const box of planBoxes) {
    name = box.getElementsByTagName("p")[0];
    txtValue = name.textContent || name.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      box.style.display = "";
    } else {
      box.style.display = "none";
    }
  }
}
function DeleteAlbum(event) {
  // debugger;
  let albumId = this.dataset.deleteAlbumId;
  const urlAlbum = `${url}/albums/${albumId}`;
  if (window.confirm(`Are you sure to delete this artist from the list?`)) {
    fetch(urlAlbum, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      method: "DELETE",
    }).then((data) => {
      if (data.status === 200) {
        location.reload();
      }
    });
  }
}
function GoToLogin() {
  debugger;
  sessionStorage.removeItem("jwt");
  window.location.href = "login.html";
}
function GoToEditAlbum(event) {
  let albumId = this.dataset.editAlbumId;
  window.location.href = `album.html?artistId=${artistId}&albumId=${albumId}`;
}
function fetchArtist() {
  let status;
  fetch(url, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
    method: "GET",
  })
    .then((response) => {
      // debugger;
      console.log(response);
      status = response.status;
      return response.json();
    })
    .then((data) => {
      if (status == 200) {
        console.log(data);
        let form = createInfoForm(data);
        let imgForm = createImgForm(data);
        const imageUrl = data.imagePath
          ? `${baseRawUrl}/${data.imagePath}`
          : "";
        document.getElementById("artist-container").innerHTML = form;
        document.getElementById("artist-container-img").innerHTML = imgForm;
        document.getElementById(
          "prof-img"
        ).innerHTML = `<div class="artist-photo"><img src="${imageUrl}" alt="artist" /></div>`;
      } else {
        alert(data);
      }
    });
}

async function fetchAlbums() {
  const urlAlbums = `${url}/albums`;
  let response = await fetch(urlAlbums, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
    method: "GET",
  });
  // debugger;
  try {
    if (response.status == 200) {
      let data = await response.json();
      // debugger;
      let albumsLi = data.map((album) => {
        return createAlbumHTML(album);
      });
      let content = albumsLi.join("");
      var albumContent =
        data.length > 0
          ? `<input
          type="text"
          id="myInput"
          onkeyup="searchFunction()"
          placeholder="Search for an album by name ..."
          title="Type in a name"
        /><div class="list-not-empty destails-box"> ` +
            content +
            "</div>"
          : `<div class="img-container">
      <div class="not-found">
        <img src="/resources/img/new-empty.png" alt="not album added" />
        <p>empty</p>
      </div>
    </div>`;
      document.getElementById("albums-container").innerHTML = albumContent;

      let buttonsForDelete = document.querySelectorAll(
        "#albums-container div button[data-delete-album-id]"
      );
      for (const button of buttonsForDelete) {
        button.addEventListener("click", DeleteAlbum);
      }
      let buttonsForUpdate = document.querySelectorAll(
        "#albums-container div button[data-edit-album-id]"
      );
      for (const button of buttonsForUpdate) {
        button.addEventListener("click", GoToEditAlbum);
      }
      searchFunction();
    } else {
      var errorText = await response.text();
      alert(errorText);
    }
  } catch (error) {
    var errorText = await error.text();
    alert(errorText);
  }
}

fetchAlbums();
fetchArtist();

window.addEventListener("DOMContentLoaded", function (event) {
  // PUT

  function UpdateArtistInfo(event) {
    debugger;
    event.preventDefault();
    form = document.getElementById("edit-artist-form");
    if (!form.name.value) {
      form.name.style.backgroundColor = "red";
      return;
    }
    if (!form.artisticName.value) {
      form.artisticName.style.backgroundColor = "red";
      return;
    }
    if (!form.bornDate.value) {
      form.bornDate.style.backgroundColor = "red";
      return;
    }
    if (!form.artistDescription.value) {
      form.artistDescription.style.backgroundColor = "red";
      return;
    }

    var data = {
      Name: form.name.value,
      ArtisticName: form.artisticName.value,
      BornDate: form.bornDate.value,
      ArtistDescription: form.artistDescription.value,
    };
    fetch(url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      method: "PUT",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        alert("artist was edited");
        location.reload();
      } else {
        response.text().then((error) => {
          alert(error);
        });
      }
    });
  }

  function UpdateArtistPhoto(event) {
    debugger;
    const urlAlbums = `${url}/form`;
    event.preventDefault();
    form = document.getElementById("edit-artist-img-form");

    if (!form.image.value) {
      form.image.style.backgroundColor = "red";
      return;
    }
    const formData = new FormData();
    formData.append("Image", form.image.files[0]);

    fetch(urlAlbums, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      method: "PUT",
      body: formData,
    }).then((response) => {
      if (response.status === 200) {
        alert("artist was edited");
        location.reload();
      } else {
        response.text().then((error) => {
          alert(error);
        });
      }
    });
  }

  // create album
  function PostAlbum(event) {
    event.preventDefault();
    const urlAlbums = `${url}/albums/form`;
    for (const inputSpace of event.currentTarget) {
      if (!inputSpace) {
        inputSpace.style.backgroundColor = "red";
        return;
      }
    }

    const formData = new FormData();
    formData.append("Name", event.currentTarget.name.value);
    formData.append("ReleaseDate", event.currentTarget.releaseDate.value);
    formData.append(
      "AlbumDescription",
      event.currentTarget.albumDescription.value
    );
    formData.append("Image", event.currentTarget.image.files[0]);
    debugger;

    fetch(urlAlbums, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.status === 201) {
        location.reload();
        alert("Album was created");
      } else {
        response.text().then((error) => {
          alert(error);
        });
      }
    });
  }
  function switchForm() {
    debugger;
    let infoForm = document.querySelectorAll(".setting-form");
    let infoBtn = document.querySelectorAll(".save-btn");
    let btn = document.getElementById("switch-frm");
    let text = btn.textContent;
    btn.textContent =
      text != "Edit Image" ? "Edit Image" : "Edit Artist Information";
    infoBtn.forEach((element) => {
      element.classList.toggle("form--hidden");
    });

    infoForm.forEach((element) => {
      element.classList.toggle("form--hidden");
    });
  }
  document.getElementById("switch-frm").addEventListener("click", switchForm);
  document
    .getElementById("create-album-frm")
    .addEventListener("submit", PostAlbum);

  document
    .getElementById("save-info-changes")
    .addEventListener("click", UpdateArtistInfo);

  document
    .getElementById("save-img-changes")
    .addEventListener("click", UpdateArtistPhoto);

  document
    .getElementById("back-to-menu")
    .addEventListener("click", GoToArtists);
  document.getElementById("log-out").addEventListener("click", GoToLogin);
});
