const fs = require("fs");
const https = require("https");
// const path = require("path");
const XLSX = require("xlsx");

const HTTP_HEADERS = {
  Referer: "https://www.google.com/",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

const downloadFile = (
  /** @type {string} */ fileURL,
  /** @type {string} */ filePath,
  /** @type {Object} */ logger = console,
  /** @type {Object} */ headers = {}
) => {
  logger.log("[INFO] helper.downloadFile:", fileURL);
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    const req = https.get(
      fileURL,
      { headers: { ...HTTP_HEADERS, ...headers } },
      (res) => {
        const status = res.statusCode;
        if (status > 300 && status < 400) {
          if (res.headers.location) {
            logger.log("[INFO] Redirect to", res.headers.location);
            resolve(downloadFile(res.headers.location, filePath));
            res.destroy(); // Exit
          } else {
            logger.error("[ERROR] Could not download file:", status, fileURL);
            reject("Status code " + status);
          }
        } else if (200 !== status) {
          logger.error("[ERROR] Could not download file:", status, fileURL);
          reject("Status code " + status);
          res.destroy(); // Exit
        } else {
          res.pipe(file);
          res.on("error", (error) => {
            logger.error("[ERROR] Could not download file:", error, fileURL);
            reject(error);
          });
          file.on("finish", () => {
            file.close();
            resolve(file);
          });
        }
      }
    );

    req.on("timeout", () => {
      req.destroy(); // Exit
      reject(new Error("Request timeout"));
    });

    req.setTimeout(60000);
  });
};

const readXLSXFile = (/** @type {string} */ fileName) => {
  const result = [];
  const workbook = XLSX.readFile(fileName);
  const options = {
    header: 1,
    blankrows: false,
    raw: false,
  };

  workbook.SheetNames.forEach((name) => {
    const worksheet = workbook.Sheets[name];
    const json = XLSX.utils.sheet_to_json(worksheet, options);
    result.push(json);
  });

  return result;
};

exports.downloadFile = downloadFile;
exports.readXLSXFile = readXLSXFile;
