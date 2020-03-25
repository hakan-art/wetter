window.addEventListener("load", () => {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);

      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;

      const api = `${proxy}https://api.darksky.net/forecast/9986b86500840370af7d674935cb7a28/${lat},${long}`;

      fetch(api)
        .then(response => response.json())
        .then(data => {
          let celsius = (data.currently.temperature - 32) * (5 / 9);
          const icon = data.currently.icon;
          console.log(data);
          document.querySelector(".grad").innerHTML = celsius.toFixed(1);
          console.log(celsius.toFixed(1));
          document.querySelector(".zeitzone").innerHTML = data.timezone;
          document.querySelector(".temperatur-beschreibung").innerHTML =
            data.currently.summary;
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const aktIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[aktIcon]);
  }
});
fetch(
  "https://newsapi.org/v2/everything?q=apple&from=2020-03-24&to=2020-03-24&sortBy=popularity&apiKey=4c76937982ca48dba378fa0b10a568f8"
)
  .then(response => response.json())
  .then(post => {
    console.log(post.articles);
    document.querySelector(".news").innerHTML = post.articles[0].title;
    document.querySelector(".heute").innerHTML = `<div>
      <a href=${post.articles[0].url}> Read More</a>
      </div>`;
  });
