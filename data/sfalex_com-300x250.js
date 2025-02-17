/**
 * Embed the following code snippet in web pages at the places where the banner should appear:
 * <script src="https://sf.satsf.com/data/sfalex_com-300x250.js" defer async></script>
 */

(function (doc) {
  var BANNERS = [["https://example.com/banner1.jpg","https://example.com/landing-page","1"]];
  var SITE_ID = "sfalex_com";
  var SIZE_ID = "300x250";
  var TIMEOUT = 30 * 1000;

  var BANNER_SIZE = SIZE_ID.split('x');
  var BANNER_WIDTH = +BANNER_SIZE[0];
  var BANNER_HEIGHT = +BANNER_SIZE[1];

  var IMAGE_URL_INDEX = 0;
  var CLICK_URL_INDEX = 1;
  var VALUATION_INDEX = 2;

  var banner = doc.createElement("div");
  var script = doc.currentScript;
  var ticker = 0;

  script.parentElement.insertBefore(banner, script);
  banner.style.width = banner.style.maxWidth = BANNER_WIDTH + 'px';
  banner.style.height = banner.style.maxHeight = BANNER_HEIGHT + 'px';

  function render(data) {
    banner.firstChild && banner.removeChild(banner.firstChild);
    var iframe = banner.appendChild(doc.createElement("iframe"));
    iframe.sandbox = "allow-popups allow-popups-to-escape-sandbox";
    iframe.style.border = iframe.frameBorder = 0;
    iframe.style.width = iframe.style.maxWidth = BANNER_WIDTH + "px";
    iframe.style.height = iframe.style.maxHeight = BANNER_HEIGHT + "px";
    iframe.srcdoc = [
      "<!doctype html>",
      "<style>html,body{margin:0;overflow:hidden;padding:0}a{display:block}</style>",
      `<a target="_blank" href="${data[CLICK_URL_INDEX]}"><img src="${data[IMAGE_URL_INDEX]}" width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}" loading="lazy"></a>`,
    ].join("");
  }

  function weigh(arr) {
    if (arr.length < 2) return arr;
    var weighted = [];
    for (let i = 0; i < arr.length; i++) {
      var row = arr[i];
      var weight = parseInt(row[VALUATION_INDEX], 10) || 1;
      for (let j = 0; j < weight; j++) {
        weighted.push(row);
      }
    }
    return weighted;
  }

  function rotate() {
    if (ticker) clearTimeout(ticker)
    var randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    var weightedArr = weigh(BANNERS);
    var randomIndex = randomBuffer[0] % weightedArr.length;
    render(weightedArr[randomIndex]);
    ticker = setTimeout(rotate, TIMEOUT);
  }

  rotate();

})(document);
