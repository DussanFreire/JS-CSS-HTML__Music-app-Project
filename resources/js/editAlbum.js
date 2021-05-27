const baseUrl = "http://localhost:16470/api";
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
    
  <section id="new-artist" class="artist-section">
  <div class="form">
    <div class="row">
      <h2>Edit album here:</h2>
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
            <label for="albumPhoto">Album Photo</label>
          </div>
          <div class="col span-2-of-3">
            <input
              type="text"
              name="albumPhoto"
              value="${album.albumPhoto}"
              placeholder="Album Photo"
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
</section>;`;
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

window.addEventListener("load", function (event) {
  function GoToEditAlbum(event) {
    let albumId = this.dataset.editAlbumId;
    window.location.href = `album.html?artistId=${artistId}&albumId=${albumId}`;
  }
  function fetchAlbum() {
    let status;
    fetch(url)
      .then((response) => {
        debugger;
        console.log(response);
        status = response.status;
        return response.json();
      })
      .then((data) => {
        if (status == 200) {
          console.log(data);
          let form = createForm(data);

          document.getElementById("album-container").innerHTML = form;
          document.getElementById(
            "prof-img"
          ).innerHTML = `<div class="artist-photo"><img src="${data.albumPhoto}" alt="pizza" /></div>`;
        } else {
          alert(data);
        }
      });
  }

  fetchAlbum();
});

window.addEventListener("DOMContentLoaded", function (event) {
  function GoToArtist(event) {
    window.location.href = `artist.html?artistId=${artistId}`;
  }

  function fetchAlbum() {
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
          document.getElementById("album-container").innerHTML = form;
          document.getElementById(
            "prof-img"
          ).innerHTML = `<div class="artist-photo"><img src="${data.albumPhoto}" alt="pizza" /></div>`;
        } else {
          alert(data);
        }
      });
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
    if (!form.albumPhoto.value) {
      form.albumPhoto.style.backgroundColor = "red";
      return;
    }
    var data = {
      Name: form.name.value,
      AlbumDescription: form.albumDescription.value,
      ReleaseDate: form.releaseDate.value,
      AlbumPhoto: form.albumPhoto.value,
    };
    fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "PUT",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        alert("album was edited");
        debugger;
        fetchAlbum();
      } else {
        response.text().then((error) => {
          alert(error);
        });
      }
    });
  }

  document
    .getElementById("save-changes")
    .addEventListener("click", UpdateArtist);
  document.getElementById("back-to-menu").addEventListener("click", GoToArtist);
});
