const http = require("http");

const iterations = parseFloat(process.argv[2]) || 10;
const delay = parseFloat(process.argv[3]) || 3000;

async function getWeather(iterations, delay) {
  for (let i = 0; i < iterations; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        http.get(
          {
            host: "worldtimeapi.org",
            path: "/api/timezone/Europe/Kiev",
          },
          (res) => {
            res.on("data", (data) => {
              console.log(
                `request #${i + 1}, time: ${JSON.parse(data).datetime}`
              );
              resolve();
            });
            res.on("error", (e) => console.log(e));
          }
        );
      }, delay);
    });
  }
}

getWeather(iterations, delay).then(() => console.log("Done!"));
