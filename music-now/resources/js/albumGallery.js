if (!Boolean(sessionStorage.getItem("jwt"))) {
  window.location.href = "../login.html";
}

const baseRawUrl = "http://localhost:16470";
const baseUrl = baseRawUrl + "/api";

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
      fetchAlbums();
    }
  });
}
function GoToAlbum(event) {
  debugger;
  let albumId = this.dataset.goToAlbumId;
  let artistId = this.dataset.goToArtistId;
  window.location.href = `album.html?artistId=${artistId}&albumId=${albumId}`;
}
function formatDate(dateStr) {
  dateDivided = dateStr.slice(0, 10).split("-");
  return `${dateDivided[2]}-${dateDivided[1]}-${dateDivided[0]}`;
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

function createAlbumHTML(album) {
  const imageUrl = album.imagePath ? `${baseRawUrl}/${album.imagePath}` : "";
  return `
  <a class="pln-btn" 
  data-go-to-album-id="${album.albumId}"
  data-go-to-artist-id="${album.artistId}"
  >
    <div class="plan-box album-photo">
      <img src="${imageUrl}" alt="album" />
      <div class="hover-like">
        ${album.likes} likes
      </div>
      <div class="hover-icon">
        <a class="like-btn" 
        data-like-album-id="${album.albumId}" 
        data-like-album-likes="${album.likes}"
        data-like-artist-id="${album.artistId}"
        >
        <ion-icon name="heart-outline"></ion-icon>
        </a>
      </div>
      <p class="album-name"> ${album.albumName}</p>
      <p class="artist-name"> ${album.artistName}</p>
    </div>
  </a>`;
}

async function fetchAlbums() {
  const urlAlbums = `${baseUrl}/AlbumsGallery`;
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
function GoToLogin() {
  debugger;
  sessionStorage.removeItem("jwt");
  window.location.href = "../login.html";
}
window.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("fetch-btn").addEventListener("click", fetchAlbums);
  document.getElementById("log-out").addEventListener("click", GoToLogin);
});
