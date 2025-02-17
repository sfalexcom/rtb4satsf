// https://sheets.googleapis.com/v4/spreadsheets/SHEET_ID/values/Sheet!1A1:L7?key=API_KEY
// https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv

const fs = require("fs");
const path = require("path");
const helper = require("./helper");

const BASE_URL = "https://sf.satsf.com/data/";
const SHEET_ID = "1CnL6zDwlIFSFTqQP7klmcJR7YRFuR2yUPwwp9uuvuzk"; // Public URL
const FILE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
const TEMPLATE = ".github/workflows/template.js";
const INACTIVE = new Set(["", "0", "off", "none", "null", "false"]);

const reduce = (/** @type {string[][]} */ data) =>
  data.reduce((registry, row) => {
    // Row: [ 0:siteId, 1:bannerURL, 2:targetURL, 3:bannerType, 4:status, 5:priority, 6:rotationDelay ]
    const siteId = row[0];
    const bannerURL = row[1];
    const targetURL = row[2];
    const bannerType = row[3];
    const isActive = !INACTIVE.has((row[4] || "").trim().toLowerCase());

    if (siteId && bannerURL && targetURL && bannerType && isActive) {
      const bannerSize = bannerType.split("_").slice(-2).join("x");
      registry[siteId] ??= {};
      registry[siteId][bannerSize] ??= [];
      registry[siteId][bannerSize].push([bannerURL, targetURL, row[5], row[6]]);
    }

    return registry;
  }, {});

const build = (/** @type {string[][]} */ data) => {
  const cwd = path.resolve("./");
  const template = fs.readFileSync(path.join(cwd, TEMPLATE), "utf8");
  const dataPath = path.join(cwd, "data");
  const registry = reduce(data.slice(1)); // Slice the first (headers) row.
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

run();
