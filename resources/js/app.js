const baseUrl = "http://localhost:16470/api";

window.addEventListener("load", (event) => {
  if (!Boolean(sessionStorage.getItem("jwt"))) {
    window.location.href = "login.html";
  }
  function DeleteArtist(event) {
    // debugger;
    let artistId = this.dataset.deleteArtistId;
    let url = `${baseUrl}/artists/${artistId}`;
    fetch(url, {
      method: "DELETE",
    }).then((data) => {
      if (data.status === 200) {
        alert("deleted");
        fetchArtists();
      }
    });
  }

  function GoToEditArtist(event) {
    // debugger;
    let artistId = this.dataset.editArtistId;
    window.location.href = `artist.html?artistId=${artistId}`;
  }
  function formatDate(dateStr) {
    dateDivided = dateStr.slice(0, 10).split("-");
    return `${dateDivided[2]}-${dateDivided[1]}-${dateDivided[0]}`;
  }
  async function fetchArtists() {
    const url = `${baseUrl}/artists`;
    let response = await fetch(url);
    // debugger;
    try {
      if (response.status == 200) {
        let data = await response.json();
        // debugger;
        let artistsLi = data.map((artist) => {
          return `<div class="plan-box artist-photo"> 
                    <img  src="${artist.artistPhoto}" alt="artist"/>
                    <p class="artist-name"> ${artist.artisticName}</p>
                    <ul>
                      <li><strong>Name</strong>: ${artist.name}</li>
                      <li><strong>Born Date</strong>: ${formatDate(
                        artist.bornDate
                      )}</li>
                      <li><strong>Artist Description</strong>: ${
                        artist.artistDescription
                      }</li>
                    </ul>
                   
                    <div class="btn-container">
                      
                      <button class="btn btn-full" href="#" type="button" data-edit-artist-id="${
                        artist.id
                      }">EDIT</button>

                      <button class="btn btn-ghost"  href="#" type="button" data-delete-artist-id="${
                        artist.id
                      }">DELETE</button>
                   </div></div>`;
        });
        let content = artistsLi.join("");
        var artistContent =
          data.length > 0
            ? `<input
            type="text"
            id="myInput"
            onkeyup="searchFunction()"
            placeholder="Search for an artist by artistic name ..."
            title="Type in a name"
          /><div class="list-not-empty destails-box"> ` +
              content +
              "</div>"
            : `<div class="img-container">
        <div class="not-found">
          <img src="/resources/img/new-empty.png" alt="not artists added" />
          <p>empty</p>
        </div>
      </div>`;
        document.getElementById("artists-container").innerHTML = artistContent;

        let buttonsForDelete = document.querySelectorAll(
          "#artists-container div button[data-delete-artist-id]"
        );
        for (const button of buttonsForDelete) {
          button.addEventListener("click", DeleteArtist);
        }
        let buttonsForUpdate = document.querySelectorAll(
          "#artists-container div button[data-edit-artist-id]"
        );
        for (const button of buttonsForUpdate) {
          button.addEventListener("click", GoToEditArtist);
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
  fetchArtists();
});

window.addEventListener("DOMContentLoaded", function (event) {
  // window.addEventListener("DOMContentLoaded", function (event) {

  function DeleteArtist(event) {
    // debugger;
    let artistId = this.dataset.deleteArtistId;
    let url = `${baseUrl}/artists/${artistId}`;
    fetch(url, {
      method: "DELETE",
    }).then((data) => {
      if (data.status === 200) {
        alert("deleted");
        fetchArtists();
      }
    });
  }

  function GoToEditArtist(event) {
    // debugger;
    let artistId = this.dataset.editArtistId;
    window.location.href = `artist.html?artistId=${artistId}`;
  }
  function formatDate(dateStr) {
    dateDivided = dateStr.slice(0, 10).split("-");
    return `${dateDivided[2]}-${dateDivided[1]}-${dateDivided[0]}`;
  }
  async function fetchArtists() {
    const url = `${baseUrl}/artists`;
    let response = await fetch(url);
    // debugger;
    try {
      if (response.status == 200) {
        let data = await response.json();
        // debugger;
        let artistsLi = data.map((artist) => {
          return `<div class="plan-box artist-photo"> 
                    <img  src="${artist.artistPhoto}" alt="artist"/>
                    <p class="artist-name"> ${artist.artisticName}</p>
                    <ul>
                      <li><strong>Name</strong>: ${artist.name}</li>
                      <li><strong>Born Date</strong>: ${formatDate(
                        artist.bornDate
                      )}</li>
                      <li><strong>Artist Description</strong>: ${
                        artist.artistDescription
                      }</li>
                    </ul>
                   
                    <div class="btn-container">
                      
                      <button class="btn btn-full" href="#" type="button" data-edit-artist-id="${
                        artist.id
                      }">EDIT</button>

                      <button class="btn btn-ghost"  href="#" type="button" data-delete-artist-id="${
                        artist.id
                      }">DELETE</button>
                   </div></div>`;
        });
        let content = artistsLi.join("");
        var artistContent =
          data.length > 0
            ? `<input
            type="text"
            id="myInput"
            onkeyup="searchFunction()"
            placeholder="Search for an artist by artistic name ..."
            title="Type in a name"
          /><div class="list-not-empty destails-box"> ` +
              content +
              "</div>"
            : `<div class="img-container">
        <div class="not-found">
          <img src="/resources/img/new-empty.png" alt="not artists added" />
          <p>empty</p>
        </div>
      </div>`;
        document.getElementById("artists-container").innerHTML = artistContent;

        let buttonsForDelete = document.querySelectorAll(
          "#artists-container div button[data-delete-artist-id]"
        );
        for (const button of buttonsForDelete) {
          button.addEventListener("click", DeleteArtist);
        }
        let buttonsForUpdate = document.querySelectorAll(
          "#artists-container div button[data-edit-artist-id]"
        );
        for (const button of buttonsForUpdate) {
          button.addEventListener("click", GoToEditArtist);
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

  function PostArtist(event) {
    // debugger;
    event.preventDefault();
    let url = `${baseUrl}/artists`;

    if (!event.currentTarget.name.value) {
      event.currentTarget.name.style.backgroundColor = "red";
      return;
    }
    if (!event.currentTarget.artisticName.value) {
      event.currentTarget.artisticName.style.backgroundColor = "red";
      return;
    }
    if (!event.currentTarget.bornDate.value) {
      event.currentTarget.bornDate.style.backgroundColor = "red";
      return;
    }
    if (!event.currentTarget.artistDescription.value) {
      event.currentTarget.artistDescription.style.backgroundColor = "red";
      return;
    }

    if (!event.currentTarget.artistPhoto.value) {
      event.currentTarget.artistPhoto.style.backgroundColor = "red";
      return;
    }

    var data = {
      Name: event.currentTarget.name.value,
      ArtisticName: event.currentTarget.artisticName.value,
      BornDate: event.currentTarget.bornDate.value,
      ArtistDescription: event.currentTarget.artistDescription.value,
      ArtistPhoto: event.currentTarget.artistPhoto.value,
    };

    fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 201) {
        fetchArtists();
        alert("artist was created");
      } else {
        response.text().then((error) => {
          alert(error);
        });
      }
    });
  }
  fetchArtists();
  document.getElementById("fetch-btn").addEventListener("click", fetchArtists);
  document
    .getElementById("create-artist-frm")
    .addEventListener("submit", PostArtist);
});

//https://www.freecodecamp.org/news/a-practical-es6-guide-on-how-to-perform-http-requests-using-the-fetch-api-594c3d91a547/
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
