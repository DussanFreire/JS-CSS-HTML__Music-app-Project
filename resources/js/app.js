window.addEventListener("DOMContentLoaded", function (event) {
  let artists = [];
  const baseUrl = "http://localhost:16470/api";

  /*function fetchArtists()
    {
        debugger;
        const url = `${baseUrl}/artists`;
        let status;
        fetch(url)
        .then((response) => { 
            status = response.status;
            return response.json();
        })
        .then((data) => {
            if(status == 200)
            {
                console.log(data)
                let artistsLi = data.map( artist => { return `<li> Name: ${artist.name} | City: ${artist.city} | DT: ${artist.dtname} </li>`});
                var artistContent = `<ul>${artistsLi.join('')}</ul>`;
                document.getElementById('artists-container').innerHTML = artistContent;
            } else {
                alert(data);
            }
        });
    }*/

  function DeleteArtist(event) {
    debugger;
    let artistId = this.dataset.deleteArtistId;
    let url = `${baseUrl}/artists/${artistId}`;
    fetch(url, {
      method: "DELETE",
    }).then((data) => {
      if (data.status === 200) {
        alert("deleted");
      }
    });
  }
  function EditArtist(event) {
    debugger;
    let artistId = this.dataset.deleteArtistId;
    let url = `${baseUrl}/artists/${artistId}`;
    fetch(url, {
      method: "PUT",
    }).then((data) => {
      if (data.status === 200) {
        alert("deleted");
      }
    });
  }

  async function fetchArtists() {
    const url = `${baseUrl}/artists`;
    let response = await fetch(url);
    // debugger;
    try {
      if (response.status == 200) {
        let data = await response.json();
        let artistsLi = data.map((artist) => {
          return `<div class="plan-box artist-photo"> 
                    <img  src="https://st3.depositphotos.com/5572200/12714/i/950/depositphotos_127142610-stock-photo-the-rolling-stones-logo.jpg" alt="pizza"/>
                    <p class="artist-name"> ${artist.artisticName}</p>
                    <ul>
                      <li>Name: ${artist.name}</li>
                      <li>Born Date: ${artist.bornDate.slice(0, 10)}</li>
                      <li>Artist Description: <br>${
                        artist.artistDescription
                      }</li>
                    </ul>
                   
                    <div class="btn-container">
                      <button class="btn btn-full"  href="#clasicas" type="button" data-delete-artist-id="${
                        artist.id
                      }">DELETE</button>
                      <button class="btn btn-ghost" href="#clasicas" data-edit-artist-id="${
                        artist.id
                      }
                      data-edit-artist-name="${artist.name}
                      data-edit-artist-artisticName="${artist.artisticName}
                      data-edit-artist-bornDate="${artist.bornDate}
                      data-edit-artist-artistDescription="${
                        artist.artistDescription
                      }
                      ">EDIT</button>
                   </div>
                </div>`;
        });
        var artistContent = artistsLi.join("");
        document.getElementById("artists-container").innerHTML = artistContent;

        let buttons = document.querySelectorAll(
          "#artists-container div button[data-delete-artist-id]"
        );
        for (const button of buttons) {
          button.addEventListener("click", DeleteArtist);
          // button.addEventListener("click", EditArtist);
        }
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
    debugger;
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

    var data = {
      Name: event.currentTarget.name.value,
      ArtisticName: event.currentTarget.artisticName.value,
      BornDate: event.currentTarget.bornDate.value,
      ArtistDescription: event.currentTarget.artistDescription.value,
    };

    fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 201) {
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

//https://www.freecodecamp.org/news/a-practical-es6-guide-on-how-to-perform-http-requests-using-the-fetch-api-594c3d91a547/
