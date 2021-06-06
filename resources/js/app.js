const baseUrl = "http://localhost:16470/api";

function DeleteArtist(event) {
  // debugger;
  let artistId = this.dataset.deleteArtistId;
  let url = `${baseUrl}/artists/${artistId}`;
  if (window.confirm(`Are you sure to delete this artist from the list?`)) {
    fetch(url, {
      method: "DELETE",
    }).then((data) => {
      if (data.status === 200) {
        location.reload();
      }
    });
  }
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
// if (!Boolean(sessionStorage.getItem("jwt"))) {
//   window.location.href = "login.html";
// }

window.addEventListener("DOMContentLoaded", function (event) {
  function PostArtist(event) {
    debugger;
    event.preventDefault();
    let url = `${baseUrl}/artists`;

    for (const inputSpace of event.currentTarget) {
      if (!inputSpace) {
        inputSpace.style.backgroundColor = "red";
        return;
      }
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
        location.reload();
        alert("artist was created");
      } else {
        response.text().then((error) => {
          alert(error);
        });
      }
    });
  }
  document.getElementById("fetch-btn").addEventListener("click", fetchArtists);
  document
    .getElementById("create-artist-frm")
    .addEventListener("submit", PostArtist);
});
