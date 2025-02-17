// https://sheets.googleapis.com/v4/spreadsheets/SHEET_ID/values/Sheet!1A1:L7?key=API_KEY
// https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv

const fs = require("fs");
const path = require("path");
const helper = require("./helper");

const BASE_URL = "https://sf.satsf.com/data/";
const SHEET_ID = "1CnL6zDwlIFSFTqQP7klmcJR7YRFuR2yUPwwp9uuvuzk"; // Public URL
const FILE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
const TEMPLATE = ".github/workflows/template.js";

const reduce = (data) =>
  data.reduce((acc, row) => {
    // Row: [ 0:siteId, 1:bannerURL, 2:targetURL, 3:bannerType, 4:status, 5:priority, 6:rotationDelay ]
    const siteId = row[0];
    if (siteId) {
      const bannerType = row[3];
      const bannerSize = bannerType.split("_").slice(-2).join("x");
      const status = (row[4] || "").trim().toLowerCase();

      const isActive =
        status !== "" &&
        status !== "0" &&
        status !== "off" &&
        status !== "none" &&
        status !== "null" &&
        status !== "false";

      if (isActive) {
        acc[siteId] ??= {};
        acc[siteId][bannerSize] ??= [];
        acc[siteId][bannerSize].push([row[1], row[2], row[5], row[6]]);
      }
    }

    return acc;
  }, {});

const build = (data) => {
  const cwd = path.resolve("./");
  const template = fs.readFileSync(path.join(cwd, TEMPLATE), "utf8");
  const dataPath = path.join(cwd, "data");
  const registry = reduce(data.slice(1));
  fs.existsSync(dataPath) || fs.mkdirSync(dataPath);

  for (const [siteId, sizes] of Object.entries(registry)) {
    for (const [sizeId, banners] of Object.entries(sizes)) {
      const fileName = `${siteId}-${sizeId}.js`;
      const content = template
        .replaceAll("{{ SITE_ID }}", siteId)
        .replaceAll("{{ SIZE_ID }}", sizeId)
        .replaceAll("{{ BASE_URL }}", BASE_URL)
        .replaceAll("{{ BANNERS }}", JSON.stringify(banners));
      fs.writeFileSync(path.join(dataPath, fileName), content);
    }
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
