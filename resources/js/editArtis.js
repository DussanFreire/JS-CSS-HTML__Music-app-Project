const baseUrl = "http://localhost:16470/api";
var queryParams = window.location.search.split("?");
var artistId = queryParams[1].split("=")[1];
const url = `${baseUrl}/artists/${artistId}`;

window.addEventListener("load", function (event) {
  function createForm(artist) {
    const location = window.location.href;
    return `<div class="plan-box artist-photo">
    <img
      src="${artist.artistPhoto}"
      alt="pizza"
    />
  </div><section id="new-artist" class="artist-section">
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
    </div>
  </section>`;
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
        } else {
          alert(data);
        }
      });
  }
  fetchArtist();
});
window.addEventListener("DOMContentLoaded", function (event) {
  function createForm(artist) {
    const location = window.location.href;
    return `<div class="plan-box artist-photo">
    <img
      src="${artist.artistPhoto}"
      alt="pizza"
    />
  </div><section id="new-artist" class="artist-section">
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
    </div>
  </section>`;
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
        } else {
          alert(data);
        }
      });
  }
  // PUT
  function UpdateArtist(event) {
    // debugger;
    event.preventDefault();
    form = document.getElementById("edit-artist-form");
    if (!form.name.value) {
      form.name.style.backgroundColor = "red";
      return;
    }
    if (!form.artisticName.value) {
      form.artisticName.style.backgroundColor = "red";
      return;
    }
    if (!form.bornDate.value) {
      form.bornDate.style.backgroundColor = "red";
      return;
    }
    if (!form.artistDescription.value) {
      form.artistDescription.style.backgroundColor = "red";
      return;
    }
    if (!form.artistPhoto.value) {
      form.artistPhoto.style.backgroundColor = "red";
      return;
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
  function GoToArtists(event) {
    // debugger;
    window.location.href = `index.html#artsts-added`;
  }
  document
    .getElementById("save-changes")
    .addEventListener("click", UpdateArtist);
  document
    .getElementById("back-to-menu")
    .addEventListener("click", GoToArtists);
});
