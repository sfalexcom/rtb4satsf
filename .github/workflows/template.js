/**
 * Embed the following code snippet in web pages at the places where the banner should appear:
 * <script src="{{ BASE_URL }}{{ SITE_ID }}-{{ SIZE_ID }}.js" defer async></script>
 */

(function (doc) {
  var IMAGE_URL_INDEX = 0;
  var CLICK_URL_INDEX = 1;
  var VALUATION_INDEX = 2;
  var RETENTION_INDEX = 3;

  var BANNER_SIZE = "{{ SIZE_ID }}".split('x');
  var BANNER_WIDTH = +BANNER_SIZE[0];
  var BANNER_HEIGHT = +BANNER_SIZE[1];

  var BANNERS = {{ BANNERS }};

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
    for (var i = 0; i < arr.length; i++) {
      var row = arr[i];
      var weight = parseInt(row[VALUATION_INDEX], 10) || 1;
      for (var j = 0; j < weight; j++) {
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
    var row = weightedArr[randomIndex];
    render(row);
    var timeout = parseInt(row[RETENTION_INDEX], 10) || 30;
    ticker = setTimeout(rotate, timeout * 1000);
  }

  rotate();

})(document);
