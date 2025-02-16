// https://sheets.googleapis.com/v4/spreadsheets/SHEET_ID/values/Sheet!1A1:L7?key=API_KEY
// https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv

const fs = require("fs");
const path = require("path");
const helper = require("./helper");

const SHEET_ID = "1CnL6zDwlIFSFTqQP7klmcJR7YRFuR2yUPwwp9uuvuzk"; // Public URL
const FILE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
const TEMPLATE = ".github/workflows/template.js";

const build = (data) => {
  const cwd = path.resolve("./");
  const template = fs.readFileSync(path.join(cwd, TEMPLATE), "utf8");
  const dataPath = path.join(cwd, "data");
  fs.existsSync(dataPath) || fs.mkdirSync(dataPath);

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const siteId = row[0];
    const bannerType = row[3];
    const bannerSize = bannerType.split("_").slice(-2).join("x");
    const fileName = `${siteId}-${bannerSize}.js`;

    const content = template
      .replace("{{ SITE_ID }}", siteId)
      .replace("{{ BANNER_URL }}", row[1])
      .replace("{{ TARGET_URL }}", row[2])
      .replace("{{ BANNER_TYPE }}", row[3])
      .replace("{{ STATUS }}", row[4])
      .replace("{{ PRIORITY }}", row[5]);
    fs.writeFileSync(path.join(dataPath, fileName), content);
  }
};

const run = async () => {
  const fileName = `${SHEET_ID}.csv`;

  try {
    const file = await helper.downloadFile(FILE_URL, fileName);
    if (file) {
      const data = helper.readXLSXFile(fileName);
      if (data && data.length) {
        build(data[0]);
      }
    }
  } catch (ex) {
    console.error("Could not get data file:", ex);
  }
};

// (async () => {
run();
// })();
