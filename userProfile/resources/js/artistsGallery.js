if (!Boolean(sessionStorage.getItem("jwt"))) {
  window.location.href = "../login.html";
}

const baseRawUrl = "http://localhost:16470";
const baseUrl = baseRawUrl + "/api";

function FollowArtist(event) {
  debugger;
  let artistId = this.dataset.followersArtistId;
  let followers = Number(this.dataset.artistFollowers) + 1;
  let url = `${baseUrl}/artists/${artistId}`;
  var data = {
    Followers: followers,
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
function GotToArtist(event) {
  debugger;
  let artistId = this.dataset.goToArtistId;
  window.location.href = `artist.html?artistId=${artistId}`;
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
  let response = await fetch(url, {
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
      let artistsLi = data.map((artist) => {
        const imageUrl = artist.imagePath
          ? `${baseRawUrl}/${artist.imagePath}`
          : "";
        return `
        <a class="pln-btn" 
        data-go-to-artist-id="${artist.id}"
        >
          <div class="plan-box artist-photo"> 
            <img  src="${imageUrl}" alt="artist"/>
            <div class="hover-like">
              ${artist.followers} followers
            </div>
            <div class="hover-icon">
              <a class="like-btn" 
              data-followers-artist-id="${artist.id}" 
              data-artist-followers="${artist.followers}"
              >
                <ion-icon name="heart-outline"></ion-icon>
              </a>
            </div>
            <p class="artist-name"> ${artist.artisticName}</p>
          </div>
        </a>`;
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
        "#artists-container a[data-followers-artist-id]"
      );
      for (const button of buttonsForDelete) {
        button.addEventListener("click", FollowArtist);
      }
      let buttonsForUpdate = document.querySelectorAll(
        "#artists-container a[data-go-to-artist-id]"
      );
      for (const button of buttonsForUpdate) {
        button.addEventListener("click", GotToArtist);
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

function GoToLogin() {
  debugger;
  sessionStorage.removeItem("jwt");
  window.location.href = "../login.html";
}
window.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("fetch-btn").addEventListener("click", fetchArtists);
  document.getElementById("log-out").addEventListener("click", GoToLogin);
});
