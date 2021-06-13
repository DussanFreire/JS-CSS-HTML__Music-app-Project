if (!Boolean(sessionStorage.getItem("jwt"))) {
  window.location.href = "login.html";
}

const baseRawUrl = "http://localhost:16470";
const baseUrl = baseRawUrl + "/api";

function DeleteArtist(event) {
  // debugger;
  let artistId = this.dataset.deleteArtistId;
  let url = `${baseUrl}/artists/${artistId}`;
  if (window.confirm(`Are you sure to delete this artist from the list?`)) {
    fetch(url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
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
function GoToEditArtist(event) {
  debugger;
  let artistId = this.dataset.editArtistId;
  window.location.href = `artist.html?artistId=${artistId}`;
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
async function fetchAlbums() {
  const urlAlbums = `${baseUrl}/AlbumsGallery`;
  let response = await fetch(urlAlbums, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
    method: "GET",
  });
  debugger;
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
        "albums-container div button[data-delete-album-id]"
      );
      for (const button of buttonsForDelete) {
        button.addEventListener("click", DeleteAlbum);
      }
      let buttonsForUpdate = document.querySelectorAll(
        "albums-container div button[data-edit-album-id]"
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
function GoToLogin() {
  debugger;
  sessionStorage.removeItem("jwt");
  window.location.href = "login.html";
}
window.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("fetch-btn").addEventListener("click", fetchAlbums);
  document.getElementById("log-out").addEventListener("click", GoToLogin);
});
