const ejs = require("ejs");
const fs = require("fs");

const serviceList = require("./service-list");
const generateService = require("./generate-service");

/* Reading the contents of
the `docker-compose.yml.ejs` file and storing it in the `template` variable as a string. */
const template = fs.readFileSync("./docker-compose.yml.ejs", "utf8");

/* Rendering the `template` string using the `ejs` module and passing in two objects as variables: `generateService` and `serviceList`. */
const rendered = ejs.render(template, { generateService, serviceList });

/* Writing the rendered string to a file named `docker-compose.yml` using the `fs` module. */
fs.writeFileSync("./docker-compose.yml", rendered.replace(/&#39;/g, "'"));
