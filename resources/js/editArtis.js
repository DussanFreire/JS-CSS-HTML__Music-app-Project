window.addEventListener("load", function (event) {
  const baseUrl = "http://localhost:16470/api";
  var queryParams = window.location.search.split("?");
  var artistId = queryParams[1].split("=")[1];
  //   http://localhost:16470/api/artists/1
  function fetchArtist() {
    const url = `${baseUrl}/artists/${artistId}`;
    let status;
    fetch("http://localhost:16470/api/artists/1")
      .then((response) => {
        // debugger;
        console.log(response);
        status = response.status;
        return response.json();
      })
      .then((data) => {
        if (status == 200) {
          console.log(data);
          let form = `<form id="artist-frm">
          <label for="name">Name</label>
          <input type="text" value="${data.name}" name="name" />
          <label for="artisticName">Artistic Name</label>
          <input type="text" value="${data.artisticName}" name="artisticName" />
          <label for="artistDescription">Artist Description</label>
          <input type="text" value="${
            data.artistDescription
          }" name="artistDescription" />
          <label for="bornDate">Born Date</label>
          <input type="date" value="${data.bornDate.slice(
            0,
            10
          )}" name="bornDate" />
          <input type="submit" value="submit" />
        </form>`;
          document.getElementById("artist-container").innerHTML = form;
        } else {
          alert(data);
        }
      });
  }
  fetchArtist();
});
