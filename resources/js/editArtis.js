const baseUrl = "http://localhost:16470/api";
var queryParams = window.location.search.split("?");
var artistId = queryParams[1].split("=")[1];
const url = `${baseUrl}/artists/${artistId}`;

function formatDate(dateStr) {
  dateDivided = dateStr.slice(0, 10).split("-");
  return `${dateDivided[2]}-${dateDivided[1]}-${dateDivided[0]}`;
}
function createForm(artist) {
  const location = window.location.href;
  return `
  
<section id="new-artist" class="artist-section">
  <div class="form">
    <div class="row">
      <h2>Edit the artist here:</h2>
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
            <label for="artistDescription">Artist Description</label>
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
              <label for="artistPhoto">Artist Photo</label>
            </div>
            <div class="col span-2-of-3">
              <input
                type="text"
                value="${artist.artistPhoto}"
                name="artistPhoto"
                placeholder="Artist Photo"
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
</section>`;
}

function createAlbumHTML(album) {
  return `<div class="plan-box album-photo">
  <img src="${album.albumPhoto}" alt="album" />
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
  fetch(urlAlbum, {
    method: "DELETE",
  }).then((data) => {
    if (data.status === 200) {
      alert("deleted");
      fetchAlbums();
    }
  });
}
function GoToEditAlbum(event) {
  let albumId = this.dataset.editAlbumId;
  window.location.href = `album.html?artistId=${artistId}&albumId=${albumId}`;
}
function fetchArtist() {
  let status;
  fetch(url)
    .then((response) => {
      // debugger;
      console.log(response);
      status = response.status;
      return response.json();
    })
    .then((data) => {
      if (status == 200) {
        console.log(data);
        let form = createForm(data);

        document.getElementById("artist-container").innerHTML = form;
        document.getElementById(
          "prof-img"
        ).innerHTML = `<div class="artist-photo"><img src="${data.artistPhoto}" alt="pizza" /></div>`;
      } else {
        alert(data);
      }
    });
}

async function fetchAlbums() {
  const urlAlbums = `${url}/albums`;
  let response = await fetch(urlAlbums);
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
  function UpdateArtist(event) {
    // debugger;
    event.preventDefault();
    form = document.getElementById("edit-artist-form");
    for (const inputSpace of event.currentTarget) {
      if (!inputSpace) {
        inputSpace.style.backgroundColor = "red";
        return;
      }
    }

    var data = {
      Name: form.name.value,
      ArtisticName: form.artisticName.value,
      BornDate: form.bornDate.value,
      ArtistDescription: form.artistDescription.value,
      ArtistPhoto: form.artistPhoto.value,
    };
    fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "PUT",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        alert("artist was edited");
        fetchArtist();
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
    const urlAlbums = `${url}/albums`;

    for (const inputSpace of event.currentTarget) {
      if (!inputSpace) {
        inputSpace.style.backgroundColor = "red";
        return;
      }
    }

    var data = {
      Name: event.currentTarget.name.value,
      ReleaseDate: event.currentTarget.releaseDate.value,
      AlbumDescription: event.currentTarget.albumDescription.value,
      AlbumPhoto: event.currentTarget.albumPhoto.value,
    };
    debugger;

    fetch(urlAlbums, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 201) {
        fetchAlbums();
        alert("Album was created");
      } else {
        response.text().then((error) => {
          alert(error);
        });
      }
    });
  }

  document
    .getElementById("create-album-frm")
    .addEventListener("submit", PostAlbum);

  document
    .getElementById("save-changes")
    .addEventListener("click", UpdateArtist);
  document
    .getElementById("back-to-menu")
    .addEventListener("click", GoToArtists);
});
