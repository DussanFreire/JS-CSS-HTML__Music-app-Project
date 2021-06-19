if (!Boolean(sessionStorage.getItem("jwt"))) {
  window.location.href = "login.html";
}
const baseRawUrl = "http://localhost:16470";
const baseUrl = baseRawUrl + "/api";
var queryParams = window.location.search.split("?");
var artistId = queryParams[1].split("=")[1];
const url = `${baseUrl}/artists/${artistId}`;

function GoToArtists(event) {
  window.location.href = `ArtistGallery.html`;
}

function GoToAlbum(event) {
  debugger;
  let albumId = this.dataset.goToAlbumId;
  let artistId = this.dataset.goToArtistId;
  window.location.href = `albums.html?artistId=${artistId}&albumId=${albumId}`;
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

function createAlbumHTML(album) {
  const imageUrl = album.imagePath ? `${baseRawUrl}/${album.imagePath}` : "";
  return `  <a class="pln-btn" 
  data-go-to-album-id="${album.id}"
  data-go-to-artist-id="${album.artistId}"
  >
    <div class="plan-box album-photo">
      <img src="${imageUrl}" alt="album" />
      <div class="hover-like">
        ${album.likes} likes
      </div>
      <div class="hover-icon">
        <a class="like-btn" 
        data-like-album-id="${album.id}" 
        data-like-album-likes="${album.likes}"
        data-like-artist-id="${album.artistId}"
        >
        <ion-icon name="heart-outline"></ion-icon>
        </a>
      </div>
      <p class="album-name"> ${album.name}</p>
      <p class="artist-name"> ${formatDate(album.releaseDate)}</p>
    </div>
  </a>`;
}
function LikeAlbum(event) {
  debugger;
  let albumId = this.dataset.likeAlbumId;
  let artistId = this.dataset.likeArtistId;
  let likes = Number(this.dataset.likeAlbumLikes) + 1;
  let url = `${baseUrl}/artists/${artistId}/albums/${albumId}`;
  var data = {
    Likes: likes,
  };
  fetch(url, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
    method: "PUT",
    body: JSON.stringify(data),
  }).then((data) => {
    if (data.status === 200) {
      location.reload();
    }
  });
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

function GoToLogin() {
  debugger;
  sessionStorage.removeItem("jwt");
  window.location.href = "login.html";
}
function GoToEditAlbum(event) {
  let albumId = this.dataset.editAlbumId;
  window.location.href = `album.html?artistId=${artistId}&albumId=${albumId}`;
}
function getArtistInfo(data, imageUrl) {
  return `
  <div class="artist-presentation">
    <div class="artist-photo">
        <img src="${imageUrl}" alt="artist" />
    </div>
    <div class="artist-info" >
        <p>Artistic Name: <span>${data.artisticName}</span></p>
        <p>Name: <span> ${data.name}</span></p>
        <p>Born Date: <span> ${formatDate(data.bornDate)}</span></p>
        <p>Followers: <span> ${data.followers}</span></p>
    </div>

  </div>`;
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
      debugger;

      if (status == 200) {
        console.log(data);
        const imageUrl = data.imagePath
          ? `${baseRawUrl}/${data.imagePath}`
          : "";
        document.getElementById("prof-img").innerHTML = getArtistInfo(
          data,
          imageUrl
        );
      } else {
        alert(data);
      }
    });
}

async function fetchAlbums() {
  debugger;
  const urlAlbums = `${baseUrl}/Artists/${artistId}/Albums`;
  let response = await fetch(urlAlbums, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
    method: "GET",
  });
  try {
    if (response.status == 200) {
      let data = await response.json();
      debugger;
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

      let buttonsForLike = document.querySelectorAll(
        "#albums-container div a[data-like-album-id]"
      );
      for (const button of buttonsForLike) {
        button.addEventListener("click", LikeAlbum);
      }
      let buttonsForUpdate = document.querySelectorAll(
        "#albums-container a[data-go-to-album-id].pln-btn"
      );
      for (const button of buttonsForUpdate) {
        button.addEventListener("click", GoToAlbum);
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
  document
    .getElementById("back-to-menu")
    .addEventListener("click", GoToArtists);
  document.getElementById("log-out").addEventListener("click", GoToLogin);
});
