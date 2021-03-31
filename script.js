const request = require("request");
const notifier = require("node-notifier");

const makeRequest = () => {
  return request(
    {
      url:
        "https://www.cvs.com/immunizations/covid-19-vaccine.vaccine-status.MN.json?vaccineinfo",
      method: "GET",
      headers: {
        referer: "https://www.cvs.com/immunizations/covid-19-vaccine",
      },
    },
    (error, response, body) => {
      if (error) {
        console.error(error);
      } else {
        const cities = JSON.parse(body).responsePayloadData.data.MN;

        const openings = cities.filter((c) => c.status !== "Fully Booked");

        if (openings.length > 0) {
          notifier.notify({
            title: "CVS Has Openings!",
            message:
              "There are openings in: " + openings.length + " location(s)",
          });
        } else {
          console.log("Fully Booked...");
        }
      }
    }
  );
};

makeRequest();
setInterval(makeRequest, 60000);
