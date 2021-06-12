if (!Boolean(sessionStorage.getItem("jwt"))) {
  window.location.href = "login.html";
}
const baseRawUrl = "http://localhost:16470";
const baseUrl = baseRawUrl + "/api";
var queryParams = window.location.search
  .slice(1)
  .split("&")
  .map((x) => x.split("="));
var artistId = queryParams[0][1];
var albumId = queryParams[1][1];

const url = `${baseUrl}/artists/${artistId}/albums/${albumId}`;

function formatDate(dateStr) {
  dateDivided = dateStr.slice(0, 10).split("-");
  return `${dateDivided[2]}-${dateDivided[1]}-${dateDivided[0]}`;
}
function createForm(album) {
  return `
    
  <section id="new-artist" class="artist-section setting-form">
  <div class="form">
    <div class="row">
    </div>
    <div class="row">
      <form id="edit-artist-form" method="post" action="#" class="contact-form">
        <div class="row">
          <div class="col span-1-of-3">
            <label for="name">Album Name</label>
          </div>
          <div class="col span-2-of-3">
            <input
              type="text"
              name="name"
              value="${album.name}"
              placeholder="Album Name"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col span-1-of-3">
            <label for="albumDescription">Album Description</label>
          </div>
          <div class="col span-2-of-3">
            <input
              type="text"
              value="${album.albumDescription}"
              name="albumDescription"
              placeholder="Album Description"
              required
            />
          </div>
        </div>

        <div class="row">
          <div class="col span-1-of-3">
            <label for="releaseDate">Release Date</label>
          </div>
          <div class="col span-2-of-3">
            <input
              type="date"
              value="${album.releaseDate.slice(0, 10)}"
              name="releaseDate"
              required
            />
          </div>
        </div>
        
      </form>
    </div>
  </div>
</section>`;
}
function createImgForm(album) {
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
              value="${album.imagePath}"
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
function searchFunction() {
  // debugger;
  var input, filter, ul, divContent, a, i, txtValue, planBoxes, name;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  divContent = document.querySelector(".list-not-empty");
  planBoxes = divContent.querySelectorAll(".plan-box");
  for (i = 0; i < planBoxes.length; i++) {
    name = planBoxes[i].getElementsByTagName("p")[0];
    txtValue = name.textContent || name.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      planBoxes[i].style.display = "";
    } else {
      planBoxes[i].style.display = "none";
    }
  }
}

function fetchAlbum() {
  let status;
  fetch(url, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      status = response.status;
      return response.json();
    })
    .then((data) => {
      if (status == 200) {
        console.log(data);
        let form = createForm(data);
        let imgForm = createImgForm(data);
        const imageUrl = data.imagePath
          ? `${baseRawUrl}/${data.imagePath}`
          : "";
        let albumImg = `<div class="artist-photo"><img src="${imageUrl}" alt="pizza" /></div>`;
        debugger;

        document.getElementById("album-container").innerHTML = form;
        document.getElementById("artist-container-img").innerHTML = imgForm;
        document.getElementById("prof-img").innerHTML = albumImg;
      } else {
        alert(data);
      }
    });
}

fetchAlbum();
window.addEventListener("DOMContentLoaded", function (event) {
  function GoToArtist(event) {
    window.location.href = `artist.html?artistId=${artistId}`;
  }

  // PUT
  function UpdateArtist(event) {
    debugger;
    event.preventDefault();
    form = document.getElementById("edit-artist-form");
    if (!form.name.value) {
      form.name.style.backgroundColor = "red";
      return;
    }
    if (!form.albumDescription.value) {
      form.albumDescription.style.backgroundColor = "red";
      return;
    }
    if (!form.releaseDate.value) {
      form.releaseDate.style.backgroundColor = "red";
      return;
    }
    var data = {
      Name: form.name.value,
      AlbumDescription: form.albumDescription.value,
      ReleaseDate: form.releaseDate.value,
    };
    fetch(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "PUT",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        alert("Album was edited");
        debugger;
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
    .getElementById("save-info-changes")
    .addEventListener("click", UpdateArtist);
  document
    .getElementById("save-img-changes")
    .addEventListener("click", UpdateArtistPhoto);
  document.getElementById("back-to-menu").addEventListener("click", GoToArtist);
});
