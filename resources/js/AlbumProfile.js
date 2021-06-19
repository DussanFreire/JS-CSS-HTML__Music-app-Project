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

function GoToLogin() {
  debugger;
  sessionStorage.removeItem("jwt");
  window.location.href = "login.html";
}
function GoToEditAlbum(event) {
  let albumId = this.dataset.editAlbumId;
  window.location.href = `album.html?artistId=${artistId}&albumId=${albumId}`;
}
function getAlbumInfo(albumData, artistData, imageUrl) {
  return `
    <div class="artist-presentation">
      <div class="artist-photo">
          <img src="${imageUrl}" alt="artist" />
      </div>
      <div class="artist-info" >
          <p>Name: <span> ${albumData.name}</span></p>
          <p>Autor: <span>${artistData.artisticName}</span></p>
          <p>Realise Date: <span> ${formatDate(
            albumData.releaseDate
          )}</span></p>
          <p>Likes: <span> ${albumData.likes}</span></p>
          <p>Description: <span> ${albumData.albumDescription}</span></p>
      </div>
  
    </div>`;
}

async function fetchAlbum() {
  debugger;
  const urlArtist = `${baseUrl}/Artists/${artistId}`;
  const urlAlbums = `${baseUrl}/Artists/${artistId}/Albums/${albumId}`;
  let artistResponse = await fetch(urlArtist, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
    method: "GET",
  });
  let albumResponse = await fetch(urlAlbums, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
    method: "GET",
  });
  try {
    if (artistResponse.status == 200 && albumResponse.status == 200) {
      let albumData = await albumResponse.json();
      let artistData = await artistResponse.json();
      debugger;
      const imageUrl = albumData.imagePath
        ? `${baseRawUrl}/${albumData.imagePath}`
        : "";
      document.getElementById("prof-img").innerHTML = getAlbumInfo(
        albumData,
        artistData,
        imageUrl
      );
    } else {
      var errorText = await response.text();
      alert(errorText);
    }
  } catch (error) {
    var errorText = await error.text();
    alert(errorText);
  }
}

fetchAlbum();

window.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("log-out").addEventListener("click", GoToLogin);
});
