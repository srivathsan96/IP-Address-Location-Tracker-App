const form = document.querySelector("form");
const enteredIp = document.querySelector("#ip");

// Gather User Input - IP Address
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const ipAddress = enteredIp.value;
  if (!ipAddress || ipAddress.trim().length === 0) {
    alert("Invalid IP address entered - please try again!");
    return;
  }
  fetchIpLocation(ipAddress);
});

// Display IP Address Data
function displayData(ipAdr, country, latitude, longitude, timezone) {
  document.querySelector("#ipAddress-textarea").value = ipAdr;
  document.querySelector("#country-textarea").value = country;
  document.querySelector("#latitude-textarea").value = latitude;
  document.querySelector("#longitude-textarea").value = longitude;
  document.querySelector("#timezone-textarea").value = timezone;
}

// Send HTTP Request
function sendHttpRequest(method, url) {
  return fetch(url, {
    method: method,
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        const parsedRespBody = response.json();
        return parsedRespBody;
      } else {
        return response.json().then((errData) => {
          console.log(errData);
          throw new Error("Something went wrong - Server-Side.");
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Something went wrong!");
    });
}

// Fetch IP Address Location
async function fetchIpLocation(ipAddress) {
  try {
    const responseData = await sendHttpRequest(
      "GET",
      `http://www.geoplugin.net/json.gp?ip=${ipAddress}`
    );
    const ipLocationData = responseData;
    const ipAdr = ipLocationData.geoplugin_request;
    const country = ipLocationData.geoplugin_countryName;
    const latitude = parseFloat(ipLocationData.geoplugin_latitude);
    const longitude = parseFloat(ipLocationData.geoplugin_longitude);
    const timezone = ipLocationData.geoplugin_timezone;
    // console.log(responseData);
    displayData(ipAdr, country, latitude, longitude, timezone);
  } catch (err) {
    alert(err.message);
  }
}
